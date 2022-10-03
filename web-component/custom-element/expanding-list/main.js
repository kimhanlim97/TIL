/*
li안에 텍스트를 선행한 ul이 포함되면 자식 요소들을 토글할 수 있도록 ul 요소를 확장
만약 ul이 없다면 기존 기능을 그대로 수행
*/

class ExpandingList extends HTMLUListElement {
    constructor() {
        // 여기서 self는 수퍼클래스, 즉 확장할 요소를 가리킴
        self = super()

        // Array.from 정적 메서드는 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환
        // querySelectorAll은 유사 배열 객체이자 이터러블 객체인 NodeList 객체를 반환
        // 배열 고차 함수(여기서는 forEach)를 사용하려면 NodeList 객체를 배열로 변환시킬 필요가 있음
        const uls = Array.from(self.querySelectorAll('ul'))
        const lis = Array.from(self.querySelectorAll('li'))

        // forEach는 for문을 대체하는 배열 고차 함수
        // 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고
        // 변수의 사용을 억제하여 상태 변경을 피하려는 함수형 프로그래밍 패러다임에 부합
        uls.forEach(ul => {
            ul.style.display = 'none'
        })

        lis.forEach(li => {
            // querySelectorAll은 length 프로퍼티를 제공하는 유사 배열 객체를 반환
            if (li.querySelectorAll('ul').length > 0) {
                li.setAttribute('class', 'closed')

                const childText = li.childNodes[0]

                const newSpan = document.createElement('span')
                // childNodes는 텍스트를 포함한 NodeList를 반환함. 이때 텍스트가 Node 객체 형태로 담김
                // 따라서 텍스트.textContent로 텍스트를 읽어와야함
                newSpan.textContent = childText.textContent
                newSpan.style.cursor = 'pointer'

                newSpan.onclick = self.showul

                childText.parentNode.insertBefore(newSpan, childText)
                childText.parentNode.removeChild(childText)
            }
        })
    }

    showul = e => {
        const nextul = e.target.nextElementSibling

        if (nextul.style.display === 'none') {
            nextul.style.display = 'block'
            nextul.parentNode.setAttribute('class', 'open')
        }
        else {
            nextul.style.display = 'none'
            nextul.parentNode.setAttribute('class', 'closed')
        }
    }
}

customElements.define('expanding-list', ExpandingList, { extends: 'ul' })