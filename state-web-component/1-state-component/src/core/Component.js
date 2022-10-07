export default class Component extends HTMLElement {
    $state;
    constructor () {
        super()
        this.attachShadow({ mode: 'open' })

        this.setup();
        this.setElement();
        this.setStyle();
        this.propMount();
        this.setEvent();
    }
    setup () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.stateMount();
    }
    stateMount() {
        // 처음 마운트 이후 계속 변경되는 프로퍼티를 자식 컴포넌트에 할당
        // 반드시 속성 값으로 자식 컴포넌트에 전달해야 함(setAttribute)
    }

    setElement () {
        // this.shadowRoot에 html 요소들을 부착
    }
    setStyle () {
        // this.shadowRoot에 style을 부착
    }
    propMount() {
        // 처음 마운트 이후 변경되지 않는 프로퍼티를 자식 컴포넌트에 할당
    }
    setEvent () {
        // this.shadowRoot에 event를 부착
    }

    addEvent(eventType, selector, callback) {
        const children = [ ...this.shadowRoot.querySelectorAll(selector) ]
        const isTarget = target => children.includes(target) || target.closest(selector)
        this.shadowRoot.addEventListener(eventType, e => {
            if (!isTarget(e.target)) return
            callback(e)
        })
    }
}