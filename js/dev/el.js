const EL = (() => {
    const _substr = (str, begin, end) => String.prototype.substring.call(str, begin, end);
    const el = (key, ...args) => {
        if(typeof key !== "string")
            throw "Arguments error.\nFirst argument requires string value";
        var tag = "",
            idp = key.indexOf("#"),
            clsp = key.indexOf("."),
            id = "", cls = "";
        if(idp >= 0 && clsp >= 0) {
            if(idp < clsp) {
                tag = _substr(k, 0, idp);
                id = _substr(k, idp + 1, clsp);
                cls = _substr(k, clsp + 1, key.length);
            } else {
                tag = _substr(k, 0, clsp);
                cls = _substr(k, clsp + 1, idp);
                id = _substr(k, idp + 1, key.length);
            }
        } else if(idp >= 0) {
            tag = _substr(k, 0, idp);
            id = _substr(k, idp + 1, key.length);
        } else if(clsp >= 0) {
            tag = _substr(k, 0, clsp);
            cls = _substr(k, clsp + 1, key.length);
        } else {
            tag = key;
        }
        var e = document.createElement(tag);
        if(id) e.id = id;
        if(cls) e.className = cls;
        Array.from(args).forEach(item => {
            if(typeof item === "object") {
                if(item instanceof Node) {
                    e.appendChild(item);
                } else {
                    for(var p in item) {
                        if(p === "style" && typeof item[p] === "object") {
                            var rule = "";
                            for(var r in item[p])
                                rule += r + ":" + item[p][r] + ";";
                            e.style = rule;
                        } else if(p === "on" && typeof item[p] === "object") {
                            for(var o in item[p])
                                e.addEventListener(o, item[p][o]);
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
    }
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

