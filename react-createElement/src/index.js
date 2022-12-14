import { ReactDOM } from './ReactDOM.js'

const React = {
    createElement(element, props, ...childrens) {
        let $element;
        if (typeof element === 'string') {
            $element = document.createElement(element)
            if (props instanceof Object) {
                Object.keys(props).forEach(key => {
                    $element.setAttribute(key, props[key])
                })
            }
        } else if (element instanceof Function) {
            $element = element(props)
            if (!($element instanceof HTMLElement)) {
                return console.error(`
                    TypeError: createElement 첫번째 인수로 제공되는 함수형 컴포넌트는 반드시 HTMLElement 타입을 반환해야 합니다.
                `)
            }
        } else return console.error(`
            TypeError: createElement의 첫번째 인수는 반드시 문자열 또는 함수 객체 타입을 가져야 합니다.
        `)

        childrens.forEach((children, index) => {
            if (typeof children === 'string') {
                const $textNode = document.createTextNode(children)
                $element.appendChild($textNode)
            } else if (children === null) {
                return null
            } else if (children instanceof HTMLElement) {
                $element.appendChild(children)
            } else if (children instanceof Function) {
                children = children()
                if (!(children instanceof HTMLElement)) {
                    return console.error(`
                        TypeError: createElement 내부에서 쓰이는 함수형 컴포넌트는 반드시 HTMLElement 타입을 반환해야 합니다.
                    `)
                }
                $element.appendChild(children)
            } else return console.error(`
                TypeError: ${element}의 ${index + 1}번째 자식 노드의 타입이 잘못되었습니다.
                -> 자식 노드는 반드시 null 이거나 string이거나 DOM 노드이어야 합니다.
            `)
        })

        return $element
    }
}

const root = ReactDOM.createRoot(
    document.querySelector('#app')
);
const e = React.createElement

function Hello() {
    return e('h1', { style: 'color: red;' }, 'Hello, World')
}

function CurrentTime(props) {
    return e('h2', null, `It is ${props.date}.`)
}

function App() {
    return e('div', null, 
            e(Hello, null),
            e(CurrentTime, { date: new Date().toLocaleTimeString() })
    )
}

function tick() {
    root.render(e(App, null, null))
}
tick()
setInterval(tick, 1000);