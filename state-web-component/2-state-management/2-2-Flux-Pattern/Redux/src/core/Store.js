import { observable } from './observer.js'

export const createStore = (reducer) => {
    const state = observable(reducer())

    const frozenState = {}
    Object.keys(state).forEach(key => {
        Object.defineProperty(frozenState, key, {
            get: () => state[key]
        })
    })

    const dispatch = (action) => {
        const newState = reducer(state, action)

        for (const [key, value] of Object.entries(newState)) {
            if (!state[key]) continue;
            state[key] = value;
        }
    }

    const getState = () => frozenState

    // subscribe는 observer로 대체한다
    return { getState, dispatch }
}