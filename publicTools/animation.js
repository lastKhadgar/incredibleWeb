function moveDom (dom, target, callback) {
    var attrTarget = target[2]
    var distance = Math.abs(dom[target[0]] - attrTarget)
    var interval = setInterval(() => {
        if (Math.abs(dom[target[0]] - attrTarget) > distance / 200) {
            if (dom[target[0]] - attrTarget > 100 || dom[target[0]] - attrTarget < - 100) { // 处理由于浏览器缩放导致1像素分辨不清问题
                dom.style[target[1]] = dom[target[0]] -
                    (dom[target[0]] - attrTarget > 0 ? Math.ceil((dom[target[0]] - attrTarget) / 50) : Math.floor((dom[target[0]] - attrTarget) / 50)) + 'px'
            } else {
                dom.style[target[1]] = dom[target[0]] -
                    (dom[target[0]] - attrTarget > 0 ? 2 : -2) + 'px'
            }
        } else {
            dom.style[target[1]] = attrTarget + 'px'
            if (callback) {
                callback()
            }
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

var interval = []
function scaleDom (domList, target) {
    for (var i = 0; i < domList.length; i++) {
        (function () {
            var targett = 1 - Math.abs(target - i)/10
            var st = window.getComputedStyle(domList[i], null)
            var tr = st.getPropertyValue("-webkit-transform") ||
                st.getPropertyValue("transform")
            var start = parseFloat(tr.split('(')[1].split(',')[0])
            if (!isNaN(start)) {
                var a = scaleDom1(domList, i, start, targett)
                a()
            }
        })()
    }
}

function scaleDom1 (domList, i, start, targett) {
    return function () {
        if (interval[i]) {
            clearInterval(interval[i])
        }
        interval[i] = setInterval(function () {
            if (Math.abs(targett - start) > 0.005) {
                start = start + (targett - start) / 20
                domList[i].style.transform = 'scale(' + start + ')'
                domList[i].style.webkitTransform = 'scale(' + start + ')'
            } else {
                domList[i].style.transform = 'scale(' + targett + ')'
                domList[i].style.webkitTransform = 'scale(' + targett + ')'
                clearInterval(interval[i])
            }
        }, 10)
    }
}