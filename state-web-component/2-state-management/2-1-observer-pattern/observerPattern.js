// class 발행기관 {
//     #state;
//     #observers = new Set()

//     constructor(state) {
//         this.#state = state
//         Object.keys(state).forEach(key => Object.defineProperty(this, key, {
//             get: () => this.#state[key]
//         }))
//     }

//     내부에_변화가_생김(newState) {
//         this.#state = { ...this.#state, ...newState }
//         this.구독자에게_알림()
//     }

//     구독자_등록(subscriber) {
//         this.#observers.add(subscriber)
//     }

//     구독자에게_알림() {
//         this.#observers.forEach(fn => fn())
//     }
// }

// class 구독자 {
//     #fn;

//     constructor(발행기관에_변화가_생길_때_하는_일) {
//         this.#fn = 발행기관에_변화가_생길_때_하는_일
//     }

//     구독(publisher) {
//         publisher.구독자_등록(this.#fn)
//     }
// }

// const 상태 = new 발행기관({
//     a: 10,
//     b: 20,
// })

// const 덧셈계산기 = new 구독자(() => console.log(`a + b = ${상태.a + 상태.b}`));
// const 곱셈계산기 = new 구독자(() => console.log(`a * b = ${상태.a * 상태.b}`));

// 덧셈계산기.구독(상태)
// 곱셈계산기.구독(상태)

// 상태.구독자에게_알림()

// 상태.내부에_변화가_생김({ a: 100, b: 200 })

// ------------------------------------------------------------


// let currentObserver = null

// const state = {
//     a: 10,
//     b: 20,
// }

// const stateKeys = Object.keys(state)

// for (const key of stateKeys) {
//     // 블록 레벨 스코프안에 존재하는 _value 변수는 state가 존재하는 한 참조를 잃지 않는다.
//     // 즉, state의 a,b 접근자 프로퍼티는 블록 레벨 스코프 안에서 캡슐화된 변수 _value에 의존한다.

//     // _(variableName)은 캡슐화된 식별자에 붙이는 암묵적인 네이밍 컨벤션이다.
//     let _value = state[key]
//     const observers = new Set()

//     Object.defineProperty(state, key, {
//         get() {
//             if (currentObserver) observers.add(currentObserver)
//             return _value
//         },
//         set (value) {
//             _value = value
//             observers.forEach(observer => observer())
//         }
//     })
// }

// const 덧셈_계산기 = () => {
//     currentObserver = 덧셈_계산기
//     console.log(`a + b = ${state.a + state.b}`)
// }

// const 뺄셈_계산기 = () => {
//     currentObserver = 뺄셈_계산기
//     console.log(`a - b = ${state.a - state.b}`)
// }

// 덧셈_계산기() // 30
// state.a = 100 // 120

// 뺄셈_계산기() // 80
// // state.b를 바꾸게 되면 Set에 등록된 observer함수들이 실행된다. -> 300
// state.b = 200 // -100

// ------------------------------------------------------------

let currentObserver = null

const observe = fn => {
    currentObserver = fn
    fn()
    currentObserver = null
}

const observable = obj => {
    Object.keys(obj).forEach(key => {
        let _value = obj[key]
        const observers = new Set()

        Object.defineProperty(obj, key, {
            get() {
                if (currentObserver) observers.add(currentObserver)
                return _value
            },

            set(value) {
                _value = value
                observers.forEach(fn => fn())
            }
        })
    })

    return obj
}

const 상태 = observable({ a: 10, b: 20 })
observe(() => console.log(`a = ${상태.a}`));
observe(() => console.log(`b = ${상태.b}`));
observe(() => console.log(`a + b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a * b = ${상태.a} + ${상태.b}`));
observe(() => console.log(`a - b = ${상태.a} + ${상태.b}`));

상태.a = 100
상태.b = 200