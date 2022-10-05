customElements.define('element-details', 
    class extends HTMLElement {
        constructor() {
            super()
            const template = document
                .getElementById('element-details-template')
                .content
            console.log(template)
            const shadowRoot = this.attachShadow({ mode: 'open' })
                .appendChild(template.cloneNode(true))
        }
    }
)