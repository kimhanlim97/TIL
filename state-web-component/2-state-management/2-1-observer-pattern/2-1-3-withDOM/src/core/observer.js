let currentObserver = null

export const observe = fn => {
    currentObserver = fn;
    fn()
    currentObserver = null
}

export const observable = state => {
    Object.keys(state).forEach(key => {
        let _value = state[key]
        const observers = new Set()

        Object.defineProperty(state, key, {
            get: () => {
                if (currentObserver) observers.add(currentObserver)
                return _value
            },
            set: (value) => {
                _value = value
                observers.forEach(fn => fn());
            }
        })
    })
    return state
}