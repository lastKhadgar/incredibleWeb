function moveDom(dom, target) {
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