/* 
이미지 아이콘 및 텍스트 문자열을 html 요소로 커스텀
아이콘이 포커스되면 정보 팝업 
*/

// HTMLElement 클래스를 확장하여 PopUpInfo의 기능을 구성하는 클래스 정의
class PopUpInfo extends HTMLElement {
    constructor() {
        // super가 호출되면 부모 클래스의 constuctor를 실행
        // super가 참조되면 부모 클래스의 메서드가 참조
        // 이 경우 HTMLElement의 constructor를 실행하여 기본값을 세팅함
        super();

        // this.shadowRoot 생성 및 shadow에 참조값 전달
        const shadow = this.attachShadow({ mode: 'open' })

        // HTML 구조 생성
        const wrapper = document.createElement('span')
        wrapper.setAttribute('class', 'wrapper')
        
        const icon = wrapper.appendChild(document.createElement('span'))
        icon.setAttribute('class', 'icon')
        icon.setAttribute('tabindex', 0)

        const info = wrapper.appendChild(document.createElement('span'))
        info.setAttribute('class', 'info')

        const img = icon.appendChild(document.createElement('img'))
        img.src = this.hasAttribute('src') ? this.getAttribute('src') : 'img/default.png'

        // 여기서 this는 PopUpInfo 즉, <popup-info> 커스텀 엘리먼트를 가리킴
        const text = this.dataset.text
        info.textContent = text;

        // 스타일 생성
        const style = document.createElement('style')
        style.textContent = `
            .wrapper {
                position: relative;
            }
            .info {
                font-size: 0.8rem;
                width: 200px;
                display: inline-block;
                border: 1px solid black;
                padding: 10px;
                background: white;
                border-radius: 10px;
                opacity: 0;
                transition: 0.6s all;
                position: absolute;
                bottom: 20px;
                left: 10px;
                z-index: 3;
            }
            img {
                width: 1.2rem;
            }
            .icon:hover + .info, .icon:focus + .info {
                opacity: 1;
            }
        `;

        // 생성된 요소들을 shadow DOM(this.shadowRoot)에 추가
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }
}

// CustomElementRegistry에 커스텀 요소를 추가 -> 커스텀 요소 사용 가능
customElements.define('popup-info', PopUpInfo)