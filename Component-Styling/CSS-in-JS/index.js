import { ReactDOM } from './core/ReactDOM.js'
import { React } from './core/React.js'
const e = React.createElement

const hashCode = s => 
    s.split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0)

const updateStyle = (styleSheet, newStyle) => {
    // 처음 CSSRule을 추가할때
    if (styleSheet.cssRules.length === 0) {
        return styleSheet.replaceSync(newStyle)
    }

    // 기존에 있는 styleSheet의 내용과 같을 때
    const isDuplicate = (styleSheet.cssRules[0].cssText.replace(/\s/gi, "") 
                        === newStyle.replace(/\s/gi, ""))
    if (isDuplicate) return

    // 기존에 있는 styleSheet의 내용과 다르거나 위의 내용에서 포함 못한 내용이 있다면 그냥 교체함
    styleSheet.replaceSync(newStyle)
}

const styled = (tagName) => (styleArr, ...funcArr) => {
    
    const styleSheet = new CSSStyleSheet()
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet]

    return (props) => {
        const style = funcArr.reduce((acc, func, i) => {
            return acc + func(props) + styleArr[i + 1]
        }, styleArr[0])
        const className = `styled${hashCode(style)}`
        const completedStyle = `.${className}{${style}}`

        updateStyle(styleSheet, completedStyle)
        
        return React.createElement(tagName, { class: className, ...props })
    }
}

const StyledHello = styled('h1')`
	color: red;
`

function Hello() {
	return e(StyledHello, null, 'Hello World!')
}

const StyledCurrentTime = styled('h2')`
    color: ${ props => props.color || 'grey' };
    font-size: 30px;
    background-color: black;
    color: ${ props => props.color || 'grey' };
    font-size: 30px;
    background-color: black;
    color: ${ props => props.color || 'grey' };
`

function CurrentTime(props) {
    return e(StyledCurrentTime, { color: 'blue' }, `It is ${props.date}.`)
}

function App() {
    return e('div', null, 
            e(Hello, null),
            e(CurrentTime, { date: new Date().toLocaleTimeString() })
    )
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
function tick() {
    root.render(e(App, null))
}
tick()
setInterval(tick, 1000);
