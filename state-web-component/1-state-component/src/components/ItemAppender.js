import Component from '../core/Component.js'

export default class ItemAppender extends Component {
    constructor() {
        super()
    }

    setElement() {
        const $fragment = document.createDocumentFragment()
        const $input = document.createElement('input')
        $input.setAttribute('type', 'text')
        $input.setAttribute('class', 'appender')
        $input.setAttribute('placeholder', '아이템 내용 입력')
        $fragment.appendChild($input)
        this.shadowRoot.appendChild($fragment)
    }

    setEvent() {
        const { addItem } = this.props
        
        this.addEvent('keyup', '.appender', ({ key, target }) => {
            if (key !== 'Enter') return;
            addItem(target.value);
        });
    }
}