import Component from "../core/Component.js";

class Items extends Component {
    static get observedAttributes() {
        return ['items']
    }
    
    constructor() {
        super()
    }

    setEvent () {
        const { deleteItem, toggleItem } = this.props

        this.addEvent('click', '.delete', ({ target }) => {
            deleteItem(Number(target.closest('[data-seq]').dataset.seq))
        });

        this.addEvent('click', '.toggle', ({target}) => {
            toggleItem(Number(target.closest('[data-seq]').dataset.seq))
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const filteredItems = JSON.parse(newValue)

        const $ul = this.shadowRoot.querySelector('ul') || document.createElement('ul')
        const $fragment = document.createDocumentFragment()

        filteredItems.map(({contents, active, seq}) => {
            const $li = document.createElement('li')
            $li.setAttribute('data-seq', seq)
            const textNode = document.createTextNode(contents)
            $li.appendChild(textNode)

            const $toggleBtn = document.createElement('button')
            $toggleBtn.setAttribute('class', 'toggle')
            $toggleBtn.style = `color: ${ active ? '#09F' : '#F09' }`
            $toggleBtn.innerText = `${ active ? '활성' : '비활성' }`
            $li.appendChild($toggleBtn)

            const $deleteBtn = document.createElement('button')
            $deleteBtn.setAttribute('class', 'delete')
            $deleteBtn.setAttribute('data-index', seq)
            $deleteBtn.innerText = '삭제'
            $li.appendChild($deleteBtn)

            $fragment.appendChild($li)
        })
        $ul.innerHTML = ''
        $ul.appendChild($fragment)

        this.shadowRoot.appendChild($ul)
    }
}

export default Items