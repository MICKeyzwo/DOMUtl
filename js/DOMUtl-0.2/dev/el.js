const EL = (() => {
    const _substr = (str, begin, end) => String.prototype.substring.call(str, begin, end);
    const el = (key, ...args) => {
        if(typeof key !== "string")
            throw "Arguments error.\nFirst argument requires string value.";
        var res = [[], [], []],
            begin = 0,
            mode = 0,
            i = 0;
        for(i = 0; i < key.length; i += 1) {
            if(key[i] === "#") {
                if(i === 0 || res[mode].length >= 1) throw "Arguments Error.\nIllegal id define.";
                res[mode].push(_substr(key, begin, i));
                begin = i + 1;
                mode = 1;
            }else if(key[i] === ".") {
                if(i === 0) throw "Arguments Error.\Illegal tag define.";
                res[mode].push(_substr(key, begin, i));
                begin = i + 1;
                mode = 2;
            }
        }
        res[mode].push(_substr(key, begin, i));
        var e = document.createElement(res[0][0]);
        if(res[1].length === 1) e.id = res[1][0];
        if(res[2].length > 0) e.className = res[2].join(" ");
        Array.from(args).forEach(item => {
            if(typeof item === "object") {
                if(item instanceof Node) {
                    e.appendChild(item);
                } else {
                    for(var p in item) {
                        if(p === "style" && typeof item[p] === "object") {
                            var rule = "";
                            for(var r in item[p]) {
                                rule += r + ":" + item[p][r] + ";";
                            }
                            e.style = rule;
                        } else if(p === "on" && typeof item[p] === "object") {
                            for(var o in item[p]) {
                                e.addEventListener(o, item[p][o]);
                            }
                        } else {
                            e.setAttribute(p, item[p]);
                        }
                    }
                }
            } else if(typeof item === "string") {
                e.innerHTML += item;
            }
        });
        return e;
    };
    const br = () => el("br");
    const text = str => document.createTextNode(str);
    const mount = (parent, child) => parent.appendChild(child);
    const unmount = elm => elm.parentNode.removeChild(elm);
    const getEl = (key, root = document) => root.querySelector(key);
    const getEls = (key, root = document) => root.querySelectorAll(key);
    return {
        el,
        br,
        text,
        mount,
        unmount,
        getEl,
        getEls
    }
})()
