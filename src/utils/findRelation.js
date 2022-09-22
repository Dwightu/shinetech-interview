// 3层关系列举图谱
export const getOneRelation = (acc, cur) => {
    if (acc === "self") {
        return cur;
    } else if (cur === "self") {
        return acc;
    } else if (acc === "mother") {
        if (cur === "mother") {
            return "grandmother";
        } else if (cur === "father") {
            return "grandfather";
        } else if (cur === "daughter") {
            return "aunt";
        } else if (cur === "son") {
            return "uncle";
        } else if (cur === "wife") {
            return "mother-in-law";
        } else if (cur === "husband") {
            return "father-in-law";
        }
    } else if (acc === "father") {
        if (cur === "mother") {
            return "grandmother";
        } else if (cur === "father") {
            return "grandfather";
        } else if (cur === "daughter") {
            return "aunt";
        } else if (cur === "son") {
            return "uncle";
        } else if (cur === "wife") {
            return "mother-in-law";
        } else if (cur === "husband") {
            return "father-in-law";
        }
    } else if (acc === "daughter") {
        if (cur === "mother") {
            return "grandmother";
        } else if (cur === "father") {
            return "grandfather";
        } else if (cur === "daughter") {
            return "granddaughter";
        } else if (cur === "son") {
            return "grandson";
        } else if (cur === "wife") {
            return "daughter-in-law";
        } else if (cur === "husband") {
            return "son-in-law";
        }
    } else if (acc === "son") {
        if (cur === "mother") {
            return "grandmother";
        } else if (cur === "father") {
            return "grandfather";
        } else if (cur === "daughter") {
            return "granddaughter";
        } else if (cur === "son") {
            return "grandson";
        } else if (cur === "wife") {
            return "daughter-in-law";
        } else if (cur === "husband") {
            return "son-in-law";
        }
    } else if (acc === "wife") {
        if (cur === "mother") {
            return "mother-in-law";
        } else if (cur === "father") {
            return "father-in-law";
        } else if (cur === "daughter") {
            return "daughter-in-law";
        } else if (cur === "son") {
            return "son-in-law";
        } else if (cur === "wife") {
            return "wife";
        } else if (cur === "husband") {
            return "husband";
        }
    } else if (acc === "grandmother") {
        if (cur === "mother") {
            return "great-grandmother";
        } else if (cur === "father") {
            return "great-grandfather";
        } else if (cur === "daughter") {
            return "阿姨";
        } else if (cur === "son") {
            return "舅舅";
        } else if (cur === "wife") {
            return "grandmother-in-law";
        } else if (cur === "husband") {
            return "grandfather-in-law";
        }
    } else if (acc === "grandfather") {
        if (cur === "mother") {
            return "great-grandmother";
        } else if (cur === "father") {
            return "great-grandfather";
        } else if (cur === "daughter") {
            return "great-aunt";
        } else if (cur === "son") {
            return "great-uncle";
        } else if (cur === "wife") {
            return "grandmother-in-law";
        } else if (cur === "husband") {
            return "grandfather-in-law";
        }
    } else if (acc === "granddaughter") {
        if (cur === "mother") {
            return "great-grandmother";
        } else if (cur === "father") {
            return "great-grandfather";
        } else if (cur === "daughter") {
            return "great-granddaughter";
        } else if (cur === "son") {
            return "great-grandson";
        } else if (cur === "wife") {
            return "granddaughter-in-law";
        } else if (cur === "husband") {
            return "grandson-in-law";
        }
    } else if (acc === "grandson") {
        if (cur === "mother") {
            return "great-grandmother";
        } else if (cur === "father") {
            return "great-grandfather";
        } else if (cur === "daughter") {
            return "great-granddaughter";
        } else if (cur === "son") {
            return "great-grandson";
        } else if (cur === "wife") {
            return "granddaughter-in-law";
        } else if (cur === "husband") {
            return "grandson-in-law";
        }
    } else if (acc === "husband") {
        if (cur === "mother") {
            return "mother-in-law";
        } else if (cur === "father") {
            return "father-in-law";
        } else if (cur === "daughter") {
            return "daughter-in-law";
        } else if (cur === "son") {
            return "son-in-law";
        } else if (cur === "wife") {
            return "wife";
        } else if (cur === "husband") {
            return "husband";
        }
    } else if (acc === "舅舅") {
        if (cur === "son") {
            return "表哥";
        } else if (cur === "daughter") {
            return "表姐";
        }
    }
}