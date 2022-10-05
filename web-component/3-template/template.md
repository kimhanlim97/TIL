# 출처
* https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots

# template

* ul, select 태그와 유사함
  
* 페이지가 로드될 때 렌더링되지 않지만 런타임 중에 JS를 통해 인스턴스화 가능

# slot

* li, options 태그와 유사함

* 사용자가 정의한 마크업으로 채워 놓을 수 있는 template 안의 요소

# 실제 활용 예시
```html
<template class='my-name'>
    <slot name='first-name'>NEED FIRSTNAME</slot>
    <slot name='last-name'>NEED LASTNAME</slot>
</template>
<my-name>
    <h1 slot='first-name'>Kim</h1>
    <p slot='last-name'>hanlim</h1>
</my-name>
<my-name>
    <h1 slot='first-name'>Kim</h1>
    <p slot='last-name'>jungdo</h1>
</my-name>
```
```javascript
customElement.define('my-name', 
    class extends HTMLElement {
        constructor() {
            super()

            const shadow = this.attachShadow({ mode: 'open' })
            const template = document.querySelector('.my-name')

            shadow.appendChild(template.content.cloneNode(true))
        }
    }
)
```