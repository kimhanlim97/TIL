# 출처
* https://developer.mozilla.org/ko/docs/Web/Web_Components/Using_shadow_DOM
* https://ui.toast.com/weekly-pick/ko_20170721
* https://wit.nts-corp.com/2019/03/27/5552

# DOM의 문제점

* HTML 문서의 모든 요소와 스타일로 이루어진 DOM은 글로벌 스코프를 가짐

* 때문에 언제나 중복의 위험성을 가지고 있어 관리하기 쉽지 않음

# Shadow DOM이란? 

* 글로벌 스코프를 가지는 DOM과 분리된 스코프를 가지는 요소

* video 태그가 일련의 버튼들과 컨트롤들을 내부에 포함하고 있는 것과 비슷함

* 즉, 내부 구조가 캡슐화되어 외부 스코프의 영향을 받지 않는 DOM 요소를 말함

* element.attachShadow({option})를 통해 shadow root를 취득하고 이에 요소들을 부착하는 방식으로 사용

# Shadow DOM의 구성 요소
![img](/web-component/2-shadow-dom/md-img/shadowDom.png)

* 평평한 트리: shadow DOM이 렌더링되어 평평해진 DOM 트리의 상태

* 쉐도우 호스트: shadow DOM이 부착되는 통상적인 DOM 노드

* 쉐도우 트리: shadow DOM 내부의 DOM 트리

* 쉐도우 바운더리: shadow DOM이 끝나고, 통상적인 DOM이 시작되는 장소

* 쉐도우 루트: shadow 트리의 root 노드. 일반 DOM 스코프와의 경계선

* 라이트 돔: DOM의 쉐도우 호스트에 붙어 있는 노드들

# Shadow DOM과 OOP

* Shadow DOM은 custom element와 함께 사용할 때 빛을 발함

* custom element는 엘리먼트를 확장해 오브젝트로 만들어 줌

* 그리고 Shadow DOM은 custom element에 스코프를 제공함

* 즉 그 자체로 독립적이고 완결성 있는 컴포넌트(객체)를 생성할 수 있게 함

* 자세한 예시는 web-component/1-custom-element/1-1-custom-element 참고
