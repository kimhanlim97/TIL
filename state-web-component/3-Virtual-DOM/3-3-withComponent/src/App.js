import {Component} from "./core/Component.js";

export class App extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `;
  }

  setEvent () {
    // button을 클릭할 때 마다 state가 변경되고, 렌더링이 실행된다.
    const { addItem } = this
    const $addButton = this.$target.querySelector('button')
    $addButton.removeEventListener('click', addItem)
    $addButton.addEventListener('click', addItem);
  }

  addItem = () => {
    console.log(this)
    const { items } = this.$state;
    this.setState({ items: [ ...items, `item${items.length + 1}` ] });
  }
}