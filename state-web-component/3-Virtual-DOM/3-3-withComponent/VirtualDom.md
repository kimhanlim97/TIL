* 요구사항
    - 앱의 성능을 최적화하라

* 요구사항 분석
    - 일단 렌더링 과정을 최적화하자
      - 브라우저는 렌더링 과정(reflow + repaint)에서 성능을 제일 많이 잡아먹는다
      - 특히 reflow가 순간적으로 많이 발생할 경우 치명적이다

    - 어떻게 렌더링 과정을 최적화할 것인가?
      - 최대한 브라우저 렌더링의 양을 줄이자

    - 어떻게 하면 브라우저 렌더링의 양(연산의 양)을 줄일 수 있을까?
      - DOM의 연산을 최대한 메모리 상에서 해결하자
        cf. Fragment나 Virtual DOM도 좋은 해결책이 될 수 있을 것이다
      - DOM 연산이 끝나고 렌더링을 진행할 때 필요한 부분만 렌더링하자
        cf. DOM 업데이트 연산 과정 중에 Diff 알고리즘을 활용하는 것도 좋은 해결책이 될 수 있을 것이다.

* 디자인
    - 전체적인 흐름은 어떻게 되는가?
      - start: Component.prototype.render()
      - process: Fragment나 Virtual DOM을 활용해 메모리 상에서 연산 진행
                 연산 과정 중 Diff 알고리즘을 통해 최종적으로 렌더링될 DOM 최적화
      - end: DOM 조작 선언

    - 해당 흐름을 함수로 구현한다고 가정하면 입출력은 어떻게 되는가?
      - input: 1) new DOM(Virtual DOM): 가상의 DOM 연산과 Diff 알고리즘 수행을 위해 필요
               2) old DOM(Real DOM): Diff 알고리즘 수행과 DOM 조작 선언을 위해 필요
      - output: Real DOM 조작 선언

    - 해당 함수의 내부 과정을 의사코드로 작성해보자
      1. 메모리 연산을 수행할 가상 DOM을 생성하라
         - 바뀐 DOM을 가상 DOM으로 생성하라 -> newValue
      2. 브라우저 연산을 수행할 Real DOM을 생성(식별)하라 
         - 기존 DOM을 식별하라 -> $target(oldValue)
      3. oldValue와 newValue를 비교하는 Diff 알고리즘 수행 및 Real DOM을 조작하라
         - oldValue만 있는 경우 
           - oldValue를 RealDOM에서 제거하라
         - newValue만 있는 경우 
           - newValue를 RealDOM에 추가하라
         - oldValue와 newValue의 태그 이름이 같은 경우
           - 둘 다 텍스트 타입인 경우
             - 값이 같다면 무시하라
             - 값이 다르다면 newValue의 값으로 교체하라
           - 속성을 비교하라
             - 속성이 같다면 무시하라
             - 속성이 다르다면 newValue의 속성으로 교체하라
             - 속성이 없어졌다면 oldValue의 속성을 제거하라
             - 속성이 추가되었다면 newValue의 속성을 추가하라
         - oldValue와 newValue의 태그 이름이 다른 경우
           - oldValue를 newValue로 교체하라
      4. 위 과정을 자식 DOM까지 적용되도록 반복하라
    
    - 본 로직은 어떤 아키텍쳐를 가져야 하는가?
      - Diff 알고리즘이 꽤나 길고 복잡하기 때문에 이 과정을 따로 함수로 분리하면 좋을 것이다.