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