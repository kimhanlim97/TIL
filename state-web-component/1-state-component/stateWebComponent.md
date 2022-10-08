# 출처
* https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/
* https://developer.mozilla.org/ko/docs/Web/Web_Components
* https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM
* https://ui.toast.com/weekly-pick/ko_20170721

# SSR과 CSR 그리고 상태
* SSR: Server Side Rendering
  * 서버에서 HTML을 직접 만들어서 클라이언트에 제공
  * 클라이언트는 jQuery와 같은 라이브러리로 DOM 조작을 담당함
  * 클라이언트는 데이터(상태)를 정교하게 관리할 필요가 없었음
* CSR: Client Side Rendering
  * 서버에서는 렌더링에 필요한 데이터만 클라이언트에 제공
  * 클라이언트는 데이터(상태)를 기반으로 모든 렌더링을 담당
  * DOM은 상태에 종속되어 변화됨 -> DOM 직접 조작 X
  * 따라서, 렌더링에 필요한 상태(데이터)를 정교하게 관리할 필요가 생김

# 컴포넌트 + 상태 관리
* 커스텀화, 캡슐화, 재사용이 가능한 HTML, CSS, JS의 집합(독립적인 뷰)
* 현재 컴포넌트는 상태를 관리하고 상태 종속된(+독립적인) 뷰를 생성하는 역할로 확장
* 그리고 현재 웹 어플리케이션은 컴포넌트 단위로 설계되고 개발됨

# customElementAPI를 활용한 컴포넌트의 특성
![img](/state-web-component/md-img/componentOOP.png)
* 컴포넌트는 독립적인 뷰 So. 외부에서 컴포넌트 내부 DOM(private) 수정 X
* 컴포넌트는 상태에 종속된 뷰 So. 외부에서 전달된 prop과 상태(public) 반영 O

# customElementAPI를 활용한 상태 종속 컴포넌트의 인터페이스
* 상태는 컴포넌트 DOM의 attribute나 events를 통해 전달
```javascript
// 컴포넌트 외부에서는
...
const $itemList = this.shadowRoot.querySelector('item-list')
$itemList.setAttribute('items', JSON.stringify($state))
...

// 컴포넌트 내부에서는
...
    static get observedAttributes() {
        return ['items']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.$state = JSON.parse(newValue)
        // attribute로 전달된 상태를 통해 DOM을 구성
    }
...
```
* 상태 제외 prop들은 가상으로 생성된 커스텀 엘리먼트를 통해 전달
  * 정의되지 않은 커스텀 엘리먼트도 가상으로 생성은 가능
  * 이후 동일한 커스텀 엘리먼트가 정의되면 정의되지 않았던 커스텀 엘리먼트를 덮어씀
  * 커스텀 엘리먼트는 한번 정의되면 중복 정의될 수 없음에 유의
  * 따라서 한번 전달되면 이후로는 변경되지 않는 prop들을 전달할 필요가 있음
```javaScript
...
    // 아직은 정의되지 않은 커스텀 엘리먼트를 가상으로 생성
    const $itemList = document.createElement('item-list')
    // 초기 상태 값 전달
    $itemList.setAttribute('items', JSON.stringify(state))
    // 가상으로 생성된 커스텀 엘리먼트에 prop생성 및 추가
    $itemList.props = {
        deleteItem: deleteItem.bind(this),
        toggleItem: toggleItem.bind(this)
    }
    // 가상으로 생성된 커스텀 엘리먼트를 덮어씀. 추가된 prop은 반영됨
    // 커스텀 엘리먼트는 한번 정의되면 중복 정의될 수 없음
    customElements.define('item-list', Items)
...
```

# 상태 관리
* 상태가 변경될 때만 렌더링 실행 -> 상태에 종속된 DOM
* 직접적인 DOM 조작 X
* 이를 엄격하게 지키기 위해 미리 정의한 메서드로만 상태 변경 수행
```javaScript
...
    setState (newState) {
        // 상태를 변경하고
        this.$state = { ...this.$state, ...newState };
        // 상태에 종속되어 있는, 상태 변화를 반영한 DOM을 렌더링한다
        this.stateMount();
    }
...
```