// Subject -> 이벤트(상태 변화)가 발생하는 주체
class Publish {
    // 상태(이벤트) 세팅
    #state
    // 옵저버 목록 세팅
    // 각 옵저버는 중복 되면 안되고 순서는 별로 중요하지 않으므로 Set 형태로 관리
    #observers = new Set()

    constructor(state) {
        // 상태(이벤트) 정의 -> 각 프로퍼티에 get 엑세스만 허용함
        this.#state = state
        Object.keys(state).forEach(key => Object.defineProperty(this, key, {
            get: () => this.#state[key]
        }))
    }

    // 상태(이벤트) 변경 방식 정의 -> 해당 메서드만이 상태를 변경할 수 있는 유일한 방법
    // 상태 변화(이벤트 발생) 시 NotifyObservers 함수를 호출함
    setState(newState) {
        this.#state = { ...this.#state, ...newState }
        this.notifyObservers()
    }

    // 옵저버 등록 방식 정의
    registerObservers(subscriber) {
        this.#observers.add(subscriber)
    }

    // 등록된 옵저버들의 Notify 함수 호출
    notifyObservers() {
        this.#observers.forEach(fn => fn())
    }
}

class Subscriber {
    // Notify 함수 세팅
    #fn

    // Notify 함수 정의
    constructor(notify) {
        this.#fn = notify
    }

    subscribe(publisher) {
        publisher.registerObservers(this.#fn)
    }
}

const state = new Publish({
    a: 10,
    b: 20,
})

const add = new Subscriber(() => console.log(`a + b = ${state.a + state.b}`));
const sub = new Subscriber(() => console.log(`a + b = ${state.a - state.b}`));

add.subscribe(state)
sub.subscribe(state)

state.notifyObservers()

state.setState({ a: 100, b: 200 })