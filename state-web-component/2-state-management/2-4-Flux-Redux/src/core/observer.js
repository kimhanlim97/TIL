let currentObservers = null;

export const observe = fn => {
    currentObservers = fn
    fn()
    currentObservers = null
}

export const observable = state => {
    Object.keys(state).forEach(key => {
        let _value = state[key]
        const observers = new Set()

        Object.defineProperty(state, key, {
            get() {
                if (currentObservers) observers.add(currentObservers)
                return _value
            },
            set(value) {
                _value = value
                observers.forEach(fn => fn())
            }
        })
    })

    return state
}