function moveDom (dom, target) {
    let attrTarget = target[2]
    let interval = setInterval(() => {
        if (Math.abs(dom[target[0]] - attrTarget) > 5) {
                dom.style[target[1]] = dom[target[0]] - (dom[target[0]] - attrTarget) / 50 + 'px'
        } else {
            dom.style[target[1]] = attrTarget
            clearInterval(interval)
        }
    }, 10)
}

function addEvent(obj,type,fn) {
    if (obj.attachEvent) { // ie
        obj.attachEvent('on' + type, function () {
            fn.call(obj);
        })
    } else {
        obj.addEventListener(type, fn, false);
    }
}

function scrollListener (dom, top, callback) {
    addEvent(window,'scroll',function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop <= top[0]) {
            callback(1, scrollTop)
        } else if (scrollTop > top[0] && scrollTop < top[1]) {
            callback(2, scrollTop)
        } else {
            callback(3, scrollTop)
        }
    });
}