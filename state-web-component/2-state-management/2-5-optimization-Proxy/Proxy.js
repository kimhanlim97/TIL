// Proxy 표준 빌트인 생성자 함수를 통해 observable을 더 간단하게 만들 수 있다
export const observable = obj => {

    const observerMap = {}

    return new Proxy(obj, {
        get (target, name) {
            observerMap[name] = observerMap[name] || new Set()
            if (currentObserver) observerMap[name].add(currentObserver)
            return target[name]
        },
        set (target, name, value) {
            if (target[name] === value) return true
            if (JSON.stringify(target[name]) === JSON.stringify(value)) return true;
            target[name] = value;
            observerMap[name].forEach(fn => fn())
            return true
        }
    })
}