# Custom Element

* 컴포넌트를 만들기 위한 주요 기능 중 하나
  
* 길고 중첩된 전통적인 마크업 대신 사용자가 정의한 커스텀 요소를 사용할 수 있게 해주는 API

# CustomElementRegistry 인터페이스

* 커스텀 요소를 등록할 수 있는 메서드를 제공
  
* 등록된 커스텀 요소에 대한 정보를 제공

* window.customElement를 통해 참조

# CustomElementRegistry.define

* 커스텀 요소를 생성하는 메서드
  
* 다음과 같은 세 가지 인자를 받음

  - 커스텀 요소의 이름(문자열)
  
  - 요소의 동작을 정의하는 class

  - 옵션 객체. extends 프로퍼티에 상속 받는 요소를 명시함

# 커스텀 요소의 동작 정의 시 유의사항

* 기존 element 요소를 상속받는 서브클래스 형태가 일반적

* 새로운 커스텀 요소를 생성할 시
  * 포괄적인 element 수퍼클래스를 상속받는 서브클래스의 형태가 일반적
  * shadowRoot 프로퍼티를 open하고 정의한 커스텀 요소를 부착하는 것이 일반적

* 기존에 정의된 element를 확장할 시
  * 특정 element의 수퍼클래스를 상속받는 서브클래스의 형태가 일반적
  * 수퍼클래스의 self에 커스텀 요소를 부착해 기존 요소를 확장하는 것이 일반적

# 커스텀 요소의 생명 주기 콜백 사용하기

* connectedCallback 메서드: 커스텀 요소가 DOM에 연결될 때 호출됨

* disconnectedCallback 메서드: 커스텀 요소가 DOM에서 연결 해제될 떄 호출됨

* adoptedCallback 메서드: 커스텀 요소가 새로운 DOM으로 이동할 때 호출됨

* attributeChangedCallback 메서드: 커스텀 요소의 특성이 변경될 때 호출됨
  * observedAttributes 정적 접근자 프로퍼티를 통해 관찰할 커스텀 요소의 속성을 배열 형태로 반환해야 함

# 커스텀 요소 생성 예시

### 새로운 커스텀 요소 생성 예시
```javascript
class WordCount extends HTMLElement {
    constructor() {
        super()

        // this.shadowRoot open
        this.attachShadow({ mode: 'open' })

        // 요소, 스타일 정의
        ...

        // this.shadowRoot에 정의한 요소 및 스타일 부착
        this.shadowRoot.appendChild(...)
    }
}

customElements.define('word-count', WordCount)
```
```html
<word-count></word-count>
```

### 기존 Element 확장 예시
```javascript
class HiddenUl extends HTMLUListElement {
    constuctor() {
        // 커스텀 요소를 부착할 element (self) 지정
        self = super()

        // element에 커스텀 요소를 부착
        self.style.display = 'none'
    }
}

customElements.define('hidden-ul', HiddenUl, { extends: 'ul' })
```
```html
<ul is="hidden-ul"></ul>
```

### 생명 주기 콜백 사용 예시
```javascript
class Square extends HTMLElement {
    // attributeChangedCallback 메서드가 관찰할 속성들을 배열 형태로 반환
    static get observedAttributes() {
      return ['l', 'c']
    }

    constructor() {
      // 커스텀 요소 생성과 동일하게 진행
    }

    connectedCallback() {
      // 커스텀 요소가 DOM에 연결되었을 때 실행될 로직 작성
    }

    disconnectedCallback() {
      // 커스텀 요소가 DOM에서 연결 해제되었을 때 실행될 로직 작성
    }

    adoptedCallback() {
      // 커스텀 요소가 새로운 DOM으로 이동할 때 실행할 로직 작성
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // observedAttributes 접근자 프로퍼티가 반환하는 속성들 관찰
      // 속성이 변경되었을 때 실행될 로직 작성
    }
}

customElements.define('custom-square', Square)
```