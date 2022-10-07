import Component from "../core/Component.js";

export default class ItemFilter extends Component {
    constructor() {
        super()
    }

    setElement() {
        const $fragment = document.createDocumentFragment();
        ['0', '1', '2'].forEach(item => {
            let text;
            switch (item) {
                case '0': text = document.createTextNode('전체 보기')
                    break;
                case '1': text = document.createTextNode('활성 보기')
                    break;
                case '2': text = document.createTextNode('비활성 보기')
                    break;
            }
            const $button = document.createElement('button')
            $button.setAttribute('class', 'filterBtn')
            $button.setAttribute('data-is-filter', item)
            $button.appendChild(text)
            $fragment.appendChild($button)
        })
        this.shadowRoot.appendChild($fragment)
    }

    setEvent() {
        const { filterItem } = this.props;

        this.addEvent('click', '.filterBtn', ({ target }) => {
            filterItem(Number(target.dataset.isFilter));
        });
    }
}