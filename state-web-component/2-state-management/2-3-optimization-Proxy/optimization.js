// 변경된 상태가 이전 상태와 값이 똑같은 경우 렌더링을 방지하는 방어 로직을 작성한다.
export const observable = obj => {
    Object.keys(obj).forEach(key => {
        let _value = obj[key]
        const observers = new Set()

        Object.defineProperty(obj, key, {
            get: () => {
                if (currentObserver) observers.add(currentObserver)
                return _value
            },
            set: (value) => {
                // 이전 상태와 변경 상태의 값이 같을 경우 탈출한다. -> 원시 타입일 경우
                if (_value === value) return
                // 이전 상태와 변경 상태의 값이 같을 경우 탈출한다. -> 객체 타입일 경우
                if (JSON.stringify(_value) === JSON.stringify(value)) return
                _value = value;
                observers.forEach(fn => fn());
            }
        })
    })
}

// 상태가 연속으로 변경되는 경우에는 requestAnimationFrame과
// debounce 함수를 통해 한 프레임에 한번만 순차적으로 렌더링되도록 한다.

const debounceFrame = callback => {
    let currentCallback = -1;
    return () => {
        cancelAnimationFrame(currentCallback)
        currentCallback = requestAnimationFrame(callback)
    }
}

export const observe = fn => {
    currentObserver = debounceFrame(fn)
    fn()
    currentObserver = null
}