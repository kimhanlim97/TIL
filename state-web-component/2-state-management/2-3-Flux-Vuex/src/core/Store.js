import { observable } from './observer.js'

export class Store {
    #state; #mutations; #actions; // Private 지정 혹은 캡슐화해야 한다
    state = {}

    constructor({ state, mutation, actions }) {
        this.#state = observable(state)
        this.#mutations = mutation
        this.#actions = actions

        // state를 직접적으로 수정하면 안되므로 #state에 대한 get 엑세스만 허용한다.
        Object.keys(state).forEach(key => {
            Object.defineProperty(this.state, key, {
                get: () => this.#state[key]
            })
        })
    }

    commit(action, payload) {
        // state는 
        this.#mutations[action](this.#state, payload)
    }

    dispatch(action, payload) {
        return this.#actions[action]({
            state: this.#state,
            commit: this.commit.bind(this),
            dispatch: this.dispatch.bind(this)
        }, payload)
    }
}