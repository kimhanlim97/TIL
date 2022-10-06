import Component from "./core/Component.js";

import Items from './components/Items.js'
import './components/ItemAppender.js'
import './components/ItemFilter.js'

class App extends Component {
    constructor() {
        super()
    }

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

    setElement() {
        if (!this.matches('item-appender')) {
            const $itemAppender = document.createElement('item-appender')
            this.shadowRoot.appendChild($itemAppender)
        }
        if (!this.matches('item-list')) {
            const $itemList = document.createElement('item-list')
            this.shadowRoot.appendChild($itemList)
        }
        if (!this.matches('item-filter')) {
            const $itemFilter = document.createElement('item-filter')
            this.shadowRoot.appendChild($itemFilter)
        }
    }

    mounted() {
        const { filteredItems, deleteItem, toggleItem } = this
        const $itemAppender = this.shadowRoot.querySelector('item-appender')
        const $itemList = this.shadowRoot.querySelector('item-list')
        const $itemFilter = this.shadowRoot.querySelector('item-filter')

        $itemList.setAttribute('items', JSON.stringify(filteredItems))
        $itemList.props = {
            deleteItem: deleteItem.bind(this),
            toggleItem: toggleItem.bind(this)
        }
        if (customElements.get('item-list')) {
            return
        }
        else {
            customElements.define('item-list', Items)
        }
    }

    get filteredItems () {
        const { isFilter, items } = this.$state;
        return items.filter(({ active }) => (isFilter === 1 && active) ||
                                            (isFilter === 2 && !active) ||
                                             isFilter === 0);
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
}

customElements.define('app-component', App)