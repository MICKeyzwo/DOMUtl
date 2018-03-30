const DOMUtl = () => {
    return {
        el: (key, ...args) => {
            key = (key || "").toString();
            let tag = key.match(/^[a-z]+[0-9]?/);
            tag = tag ? tag[0] : "div";
            let e = document.createElement(tag);
            let id = key.match(/#.+?\.|#.+.$/g);
            if (id) e.id = id[0].replace("#", "").replace(".", "");
            let cls = key.match(/\..+?#|\..+.$/g);
            if (cls) e.className = cls.map(s => 
                s.replace(/\./g, " ").trim().replace("#", "")
            ).join(" ");
            args.forEach(item => {
                if (typeof item == "object") {
                    if (item instanceof Node) {
                        e.appendChild(item);
                    } else {
                        for (let p in item) {
                            if (p === "style") {
                                if (typeof item[p] == "string") {
                                    e.style = item[p];
                                } else if (typeof item[p] == "object") {
                                    let rule = "";
                                    for (let r in item[p]) {
                                        rule += r + ":" + item[p][r] + ";";
                                    }
                                    e.style = rule;
                                }
                            } else if (p === "on" && typeof item[p] == "object") {
                                for (let o in item[p]) {
                                    e.addEventListener(o, item[p][o]);
                                }
                            } else {
                                e.setAttribute(p, item[p]);
                            }
                        }
                    }
                } else if (typeof item == "string") {
                    e.textContent += item;
                } else if (typeof item == "function") {
                    item(e);
                }
            });
            return e;
        },
        html: str => {
            let temp = document.createElement("div");
            temp.innerHTML = str;
            return temp.children[0];
        },
        text: str => document.createTextNode(str),
        on: (elm, evt, cb) => elm.addEventListener(evt, cb),
        off: (elm, evt, cb) => elm.removeEventListener(evt, cb),
        mount: (parent, child) => parent.appendChild(child),
        inmount: (parent, child) => parent.insertBefore(child, parent.firstChild),
        before: (target, elm) => target.parentNode.insertBefore(elm, target),
        after: (target, elm) => target.parentNode.insertBefore(elm, target.nextSibling),
        getel: (key, root = document) => root.querySelector(key),
        getels: (key, root = document) => root.querySelectorAll(key)
    }
}
DOMUtl.assign = ctx => Object.assign(ctx, DOMUtl())
