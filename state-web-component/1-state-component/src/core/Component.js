export default class Component extends HTMLElement {
    $state;
    constructor () {
        super()
        this.attachShadow({ mode: 'open' })

        this.setup();
        this.render();
        this.setEvent();
    }
    setup () {}
    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }

    setElement () {
        // this.shadowRoot에 html 요소들을 부착
    }
    setStyle () {
        // this.shadowRoot에 style을 부착
    }
    setEvent () {
        // this.shadowRoot에 event를 부착
    }
    mounted() {

    }
    render () {
        this.setElement();
        this.setStyle();
        this.mounted()
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