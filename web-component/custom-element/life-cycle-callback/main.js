/* 
버튼 확장 커스텀 요소를 클릭하면 custom-square 커스텀 요소가 생명주기에 따라 반응함
*/

class Square extends HTMLElement {
    static get observedAttributes() {
        return ['c', 'l']
    }

    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })

        const div = document.createElement('div')
        const style = document.createElement('style')
        shadow.appendChild(style)
        shadow.appendChild(div)
    }

    connectedCallback() {
        console.log('Custom square element added to page.');
        this.updateStyle();
    }

    disconnectedCallback() {
        console.log('Custom square element removed from page.');
    }

    adoptedCallback() {
        console.log('Custom square element moved to new page.');
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('Custom square element attributes changed.');
        this.updateStyle();
    }

    updateStyle() {
        const shadow = this.shadowRoot
        shadow.querySelector('style').textContent = `
        div {
            width: ${this.getAttribute('l')}px;
            height: ${this.getAttribute('l')}px;
            background-color: ${this.getAttribute('c')};
          }
        `
    }
}

class AddSquare extends HTMLButtonElement {
    constructor() {
        self = super()
        self.innerText = 'Add custom-square to DOM'
        self.disabled = false

        self.onclick = ({target}) => {
            const square = document.createElement('custom-square')
            const update = document.querySelector('[is="update-square"]')
            const remove = document.querySelector('[is="remove-square"]')

            square.setAttribute('l', '100')
            square.setAttribute('c', 'red')
            document.body.appendChild(square)

            update.disabled = false;
            remove.disabled = false;
            target.disabled = true;
        }
    }
}

class UpdateSquare extends HTMLButtonElement {
    constructor() {
        self = super()

        self.innerText = 'Update attributes'
        self.disabled = true

        self.onclick = () => {
            const square = document.querySelector('custom-square')
            
            square.setAttribute('l', this.random(50, 200));
            square.setAttribute('c', `rgb(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)})`);
        }
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

class RemoveSquare extends HTMLButtonElement {
    constructor() {
        self = super()

        self.innerText = 'Remove custom-square from DOM'
        self.disabled = true

        self.onclick = ({target}) => {
            const square = document.querySelector('custom-square')
            const add = document.querySelector('[is="add-square"]')
            const update = document.querySelector('[is="update-square"]')

            document.body.removeChild(square);

            update.disabled = true;
            target.disabled = true;
            add.disabled = false;
        }
    }
}

customElements.define('custom-square', Square)
customElements.define('add-square', AddSquare, { extends: 'button' })
customElements.define('update-square', UpdateSquare, { extends: 'button' })
customElements.define('remove-square', RemoveSquare, { extends: 'button' })