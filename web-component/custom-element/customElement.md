# Custom Element

* 컴포넌트를 만들기 위한 주요 기능 중 하나
  
* 길고 중첩된 전통적인 마크업 대신 사용자가 정의한 커스텀 요소를 사용할 수 있게 해주는 API

# CustomElementRegistry 인터페이스

* 커스텀 요소를 등록할 수 있는 메서드를 제공
  
* 등록된 커스텀 요소에 대한 정보를 제공

* window.customElement를 통해 인스턴스 참조

# CustomElementRegistry.define

* 커스텀 요소를 생성하는 메서드
  
* 다음과 같은 세 가지 인자를 받음

  - 커스텀 요소의 이름(문자열)
  
  - 요소의 동작을 정의하는 class

  - 옵션 객체. extends 프로퍼티에 상속 받는 요소를 명시함

# 클래스 정의 시 유의사항

* shadow DOM에 커스텀 요소를 추가하기 위해 Element를 상속하는 것이 일반적

* shadowRoot 프로퍼티를 open하고 정의한 커스텀 요소를 부착하는 일련의 과정 필요

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
