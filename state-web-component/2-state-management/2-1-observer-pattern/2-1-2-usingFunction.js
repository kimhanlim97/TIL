let currentObserver = null

const observe = fn => {
    // Notify 정의
    currentObserver = fn
    // Subject가 Notify를 호출하는 것이 아니라
    // Observer가 Subject를 참조함으로써 호출
    // 따라서 Notify 함수 정의 시 참조하고자 하는 Subject를 명시해야 함
    fn()

    // Observer를 정의하는 것이 아닌
    // Notify(동작)만 정의함으로 currentObserver를 초기화해야함
    // observers는 observable에서 정의함
    currentObserver = null
}

const observable = obj => {
    Object.keys(obj).forEach(key => {
        // 상태와 옵저버는 obj에 의해 계속해서 참조되므로 가비지 콜렉터를 걱정할 필요가 없음
        // 상태 세팅
        let _value = obj[key]
        // 옵저버 세팅
        const observers = new Set()

        // 상태 접근 및 관리방법 정의
        Object.defineProperty(obj, key, {
            get() {
                // registerObservers 정의
                if (currentObserver) observers.add(currentObserver)
                return _value
            },
            set(value) {
                _value = value
                // NotifyObservers 정의
                observers.forEach(fn => fn())
            }
        })
    })
    return obj
}

const state = observable({ a: 10, b: 20 });
observe(() => console.log(`a = ${state.a}`));
observe(() => console.log(`b = ${state.b}`));
observe(() => console.log(`a + b = ${state.a} + ${state.b}`));
observe(() => console.log(`a * b = ${state.a} + ${state.b}`));
observe(() => console.log(`a - b = ${state.a} + ${state.b}`));

state.a = 100;
state.b = 200;

