import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { getOneRelation } from "../utils/findRelation";

const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const [people, setPeople] = useState([])

    // ------------------------------------------------------------------
    // API 请求，增删改查操作
    // ------------------------------------------------------------------
    // Using Mock Backend: https://www.npmjs.com/package/json-server
    const fetchPeople = async () => {
        const response = await axios({ method: 'get', url: `http://localhost:3000/people` })
        const data = await response.data;
        setPeople(data)
    }

    const updatePeople = (id, payload) => {
        axios({
            method: 'put',
            url: `http://localhost:3000/people/${id}`,
            data: payload
        }).then(() => {
            alert('successful')
            fetchPeople();
        }).catch(()=>{
            alert('找不到该id,请检查！！')
        });
    }

    const deletePeople = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete the name called ${name} ?`)) {
            axios({
                method: 'delete',
                url: `http://localhost:3000/people/${id}`,
            }).then(() => {
                alert('successful')
                fetchPeople()
            });
        }
    }

    const addPeople = (payload) => {
        // Send a POST request
        axios({
            method: 'post',
            url: `http://localhost:3000/people`,
            data: payload
        }).then(() => {
            alert('successful')
            fetchPeople()
        });
    }


    const findById = (id) => {
        return people.find(person => person.id === id) || { name: "未填写" };
    }



    useEffect(() => {
        fetchPeople()
    }, [])


    // --------------------------------------------------------------------------
    // 以下为寻找关系代码实现

    const findRelation = (obj) => {
        const { id1, id2 } = obj;
        const visited1 = {};
        let ancestorId = null;
        const queue1 = [id1];
        const queue1Relation = { [id1]: "self" }

        //广度遍历 以id1为root
        //  visited1: {1: 'self', 3: 'self/father(m)', 4: 'self/mother(m)'}
        // quequeue1Relation: {1: 'self', 3: 'self/father(m)', 4: 'self/mother(m)'}
        while (queue1.length) {
            const currentId = queue1.shift();
            if (visited1[currentId]) {
                continue;
            }
            const current = findById(currentId);
            const currentRelation = queue1Relation[currentId];
            // 反向关系时使用
            const sex = current.sex === "女" ? "w" : "m";
            if (current.monther_id && !queue1Relation[current.monther_id]) {
                queue1.push(current.monther_id);
                queue1Relation[current.monther_id] = currentRelation + `/mother(${sex})`;
            }
            if (current.father_id && !queue1Relation[current.father_id]) {
                queue1.push(current.father_id);
                queue1Relation[current.father_id] = currentRelation + `/father(${sex})`;
            }
            if (current.partner_id && !queue1Relation[current.partner_id]) {
                queue1.push(current.partner_id);
                queue1Relation[current.partner_id] = currentRelation + `/partner(${sex})`;
            }
            visited1[currentId] = currentRelation;
        }

        //第二次广度遍历
        const queue2 = [id2];
        const queue2Relation = { [id2]: "self" }
        const visited2 = {};

        while (queue2.length) {
            const currentId = queue2.shift();
            // 只要发现一个相同的 有关系的人，记录并停止循环
            if (visited1[currentId]) {
                ancestorId = currentId;
                break;
            }
            if (visited2[currentId]) {
                continue;
            }
            const current = findById(currentId);
            const currentRelation = queue2Relation[currentId];
            const sex = current.sex === "女" ? "w" : "m";
            if (current.monther_id && !queue2Relation[current.monther_id]) {
                queue2.push(current.monther_id);
                queue2Relation[current.monther_id] = currentRelation + `/mother(${sex})`;
            }
            if (current.father_id && !queue2Relation[current.father_id]) {
                queue2.push(current.father_id);
                queue2Relation[current.father_id] = currentRelation + `/father(${sex})`;
            }
            if (current.partner_id && !queue2Relation[current.partner_id]) {
                queue2.push(current.partner_id);
                queue2Relation[current.partner_id] = currentRelation + `/partner(${sex})`;
            }
            visited2[currentId] = currentRelation;
        }
        const relation = getRelation(queue1Relation[ancestorId], queue2Relation[ancestorId]);
        const res = optimize(relation, id1, id2);
        return res;
    }

    const getRelation = (relation1, relation2) => {
        relation2 = getReverseRelation(relation2);
        return relation1 + "/" + relation2;
    }

    const getReverseRelation = (relation) => {
        const relationReverse = relation.split("/").reverse();
        return relationReverse.map(item => {
            if (item === "mother(w)") {
                return "daughter";
            } else if (item === "mother(m)") {
                return "son";
            } else if (item === "father(w)") {
                return "daughter";
            } else if (item === "father(m)") {
                return "son";
            } else if (item === "self") {
                return "self";
            } else if (item === "partner(w)") {
                return "husband";
            } else if (item === "partner(m)") {
                return "wife";
            }
        }).join("/");
    }


    // 找出年龄差距，改变叫法
    const optimize = (relation, id1, id2) => {
        const a = findById(id1);
        const b = findById(id2);
        // 叫表哥还是表弟？
        const bIsBiggerThanA = a.birthday > b.birthday;
        relation = relation.replace(/\(m\)/g, "").replace(/\(w\)/g, "");


        const arr = relation.split("/");
        let jiaoshenme = "self";
        for (let i = 0; i < arr.length; i++) {
            jiaoshenme = getOneRelation(jiaoshenme, arr[i])
        }
        relation = jiaoshenme.replace(/self/g, "");

        relation = relation.replace(/哥/, bIsBiggerThanA ? "哥" : "弟");
        relation = relation.replace(/姐/, bIsBiggerThanA ? "姐" : "妹");
        return relation;
    }





    return <DataContext.Provider value={{
        people, deletePeople, findById, addPeople, updatePeople, findRelation
    }}>{children}</DataContext.Provider>
}




export default DataContext