import { updateElement } from "./updateElement.js";

export class Component {
  $target; $state;

  constructor ($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup () {};
  template () { return ''; }

  render () {
    // 브라우저 연산을 수행할 Real DOM은 여기서 식별된다
    const { $target } = this;

    // 메모리 연산을 수행할 가상 DOM을 생성한다(newNode)
    const newNode = $target.cloneNode(true)
    newNode.innerHTML = this.template()

    // Diff 알고리즘을 수행한다.
    const oldChildNodes = [ ...$target.childNodes ];
    const newChildNodes = [ ...newNode.childNodes ];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      updateElement($target, newChildNodes[i], oldChildNodes[i]);
    }
    requestAnimationFrame(() => this.setEvent());
  }

  setEvent () {}
  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}