import Component from "./core/Component.js";

import Items from './components/Items.js'
import ItemAppender from './components/ItemAppender.js'
import ItemFilter from './components/ItemFilter.js'

class App extends Component {
    constructor() {
        super()
    }
    // 초기 상태
    setup() {
        this.$state = {
            isFilter: 0,
            items: [
                {
                    seq: 1,
                    contents: 'item1',
                    active: false,
                },
                {
                    seq: 2,
                    contents: 'item2',
                    active: true,
                }
            ]
        };
    }

    // 초기 렌더링
    setElement() {
        const $fragment = document.createDocumentFragment()
        $fragment.appendChild(document.createElement('item-appender'))
        $fragment.appendChild(document.createElement('item-list'))
        $fragment.appendChild(document.createElement('item-filter'))
        this.shadowRoot.appendChild($fragment)
    }
    propMount() {
        const { filteredItems, deleteItem, toggleItem, addItem, filterItem } = this
        const $itemAppender = this.shadowRoot.querySelector('item-appender')
        const $itemList = this.shadowRoot.querySelector('item-list')
        const $itemFilter = this.shadowRoot.querySelector('item-filter')

        $itemAppender.props = {
            addItem: addItem.bind(this)
        }

        $itemList.setAttribute('items', JSON.stringify(filteredItems))
        $itemList.props = {
            deleteItem: deleteItem.bind(this),
            toggleItem: toggleItem.bind(this)
        }

        $itemFilter.props = {
            filterItem: filterItem.bind(this)
        }

        customElements.define('item-appender', ItemAppender)
        customElements.define('item-list', Items)
        customElements.define('item-filter', ItemFilter)
    }

    // 상태 변경을 반영한 렌더링
    stateMount() {
        const { filteredItems } = this
        const $itemList = this.shadowRoot.querySelector('item-list')

        $itemList.setAttribute('items', JSON.stringify(filteredItems))
    }

    // 상태 / 프로퍼티 / 메서드
    get filteredItems () {
        const { isFilter, items } = this.$state;
        return items.filter(({ active }) => (isFilter === 1 && active) ||
                                            (isFilter === 2 && !active) ||
                                             isFilter === 0);
    }

    addItem (contents) {
        const {items} = this.$state;
        const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
        const active = false;
        this.setState({
            items: [
                ...items,
                {seq, contents, active}
            ]
        });
    }

    deleteItem (seq) {
        const items = [ ...this.$state.items ];;
        items.splice(items.findIndex(v => v.seq === seq), 1);
        this.setState({items});
    }

    toggleItem (seq) {
        const items = [ ...this.$state.items ];
        const index = items.findIndex(v => v.seq === seq);
        items[index].active = !items[index].active;
        this.setState({items});
    }

    filterItem (isFilter) {
        this.setState({ isFilter });
    }
}

customElements.define('app-component', App)