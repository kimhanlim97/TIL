# 요구사항
* React의 useState와 유사한 기능을 구현하라

# 요구사항 분석
* useState는 다음과 같은 기능을 가지고 있다.
  1. 상태 값을 설정하고 변경할 수 있는 함수를 만들 수 있다.
  2. 상태를 변경할 수 있는 함수를 호출하면 렌더링이 실행된다.
  3. 컴포넌트 함수가 다시 실행되어도 상태 값은 초기화되지 않고 유지된다.

# 디자인
* useState의 인터페이스는 어떻게 되는가?
  * 입력: 초기 상태값
  * 출력: 상태값, 상태를 변경할 수 있는 함수
  
* 1,2번 기능을 구현하기 위해서 useState 함수는 어떤 과정을 거쳐야 하는가?
  1. 인자로 받은 초기 상태 값을 설정한다.
  2. 상태를 변경할 수 있는 함수를 생성한다.
     * 상태 변경 함수는 외부의 state를 변경하는 비순수 함수이다.
     1. 인자로 newState를 받는다.
     2. 함수 외부의 초기 상태 값을 참조하고 newState를 할당한다.
     3. 렌더링을 수행한다.
  3. 초기 상태값과 상태를 변경할 수 있는 함수(setState)를 반환한다.
   
* 3번 기능을 구현하기 위해서는 어떤 과정을 거쳐야 하는가?
  1. useState가 관리하는 상태를 함수 외부에서 관리한다
  2. useState 함수 내부에 초기값이 아니면 거르는 로직을 추가한다
  * 상태 변경 함수는 useState함수 외부의 상태를 참조하고 변경한다.
  
* 추가로 고려해야 할 사항은 없는가? (보안, 통신, 성능, 아키텍쳐 측면에서)
  1. 앞서 작성한 useState 함수는 일반적이지 않다.
     * useState 함수는 외부 상태 하나를 참조하고 컴포넌트 역시 이를 참조한다
     * 컴포넌트가 여러개라면 이미 상태가 설정된 useState를 사용할 수 없다.
  2. 변경된 state가 없는 경우, 추가적인 렌더링이 불필요하게 발생한다.
  3. 동시에 여러 setState가 실행될 경우, 비효율적인 렌더링이 발생한다.
  4. render와 useState, 그리고 기타 전역 변수를 통합해 관리하자
  5. 앞서 작성한 내용을 모듈화를 적용해 관리해보자

* 1-useState 함수를 일반적 사용하기위해 어떤 과정이 추가 및 수정되어야 하는가?
  * useState가 참조하는 상태를 컴포넌트 각각에 맞게 관리할 필요가 있다.
  1. state를 객체 형태로 관리한다
  2. useState 함수를 호출한 컴포넌트를 식별한다.
  3. 만약 컴포넌트가 state 내부에 존재하지 않는다면 등록 및 초기값을 설정한다.
  4. setState 함수는 외부 state에 등록된 컴포넌트의 상태를 참조 및 변경한다
  5. useState 함수는 state.component의 값을 상태로 반환한다.
  6. 그리고 state.component를 참조하고 있는 setState 함수를 반환한다.
  7. 한 컴포넌트 내에서 useState를 두번 사용할 시 에러 처리를 한다.
     * 컴포넌트를 기준으로 상태가 관리 되기 때문이다.

* 1-위 방식으로 useState를 작성할 때 문제점
  1. 컴포넌트 안에서 useState를 두번 이상 사용할 수 없다.
  2. setState 실행 시 해당 함수의 렉시컬 환경에서 에러가 발생한다.
  3. caller 프로퍼티는 deprecated된 프로퍼티다.
  * state를 객체 대신 배열로 구성해보자

* 1-다시 useState 함수를 작성해보자
  * state는 useState가 호출될 때 딱 한번 생성된다. 이후로는 변경만 된다.
  * 카운트를 생성하고 해당 카운트를 클로져 함수가 참조하도록 하자
  1. 카운트를 생성하라
  2. state를 배열로 관리하라 -> states
  3. 초기 상태를 인수로 받아라
  4. 만약 처음 생성된 state라면 상태의 초기값을 설정하라
     * 이때 에러 처리는 무의미하므로 하지마라
  5. 현재 카운트를 setState가 참조하도록 해 이후에 업데이트하도록 구성하라
  6. 카운트를 갱신(++)하라
  7. states에 할당된 상태와 이를 참조하고 있는 setState를 반환하라
    
* 2-state 변경이 없어도 추가적으로 발생하는 렌더링을 어떻게 막을 수 있는가?
  * 이전 값과 새로운 값을 비교하는 로직을 setState 함수 내에 추가한다.
  1. 기존 값을 식별한다.
  2. 새로운 값을 식별한다.
  3. 둘을 비교해 같을 경우 추가적인 렌더링을 실행하지 않는다.
     * 둘의 타입이 원시타입일 경우 간단한 표현식으로 구현이 가능하다.
     * 만약 state의 타입이 객체 타입일 경우는 어떨까?
     * JSON.stringify를 통해 문자열로 변환한 뒤 비교한다.
  4. 그외의 경우 추가적인 렌더링을 실행한다.

* 3-동시에 여러 setState가 실행될 때 효율적으로 렌더링하려면 어떻게 해야할까?
  * 일정 시간을 설정하고 그 시간 내에 발생한 state 변경 내역을 모아 렌더링한다.
  * 일정 시간은 얼마가 적당할까?
     * 1프레임을 기준으로 렌더링하자. 일반적인 모니터의 주사율은 60프레임이다.
  1. debounce 함수를 생성한다.
     * 타이머 아이디와 클로저를 활용해 debounce 함수를 구현한다.
     * requestAnimationFrame을 통해 프레임과 타이머를 일치시킨다.
  2. render 함수를 debounce 함수에 콜백으로 삽입한다.

* 4-render와 useState, 그리고 기타 전역 변수를 통합해 관리하자
  * MyReact 함수를 실행하면 useState와 render함수가 반환된다.
  * MyReact 함수 내부에서는 앞서 선언했던 전역 변수가 선언 및 관리된다.
  * MyReact 함수 내부의 useState와 render는 상태를 기억하는 클로저함수이다.
  1. 전역변수들을 MyReact 함수 내부에서 options 객체로 관리하라
  2. MyReact 함수 내부에서 useState를 선언 및 작성하라
  3. render 함수를 일반화하라
     * 기존 render 함수는 내부에서 직접적으로 컴포넌트를 명시하여 렌더링하였음
     * 이를 일반화하기 위해서는 루트와 컴포넌트를 인수로 받아야 한다.
     * 함수의 마지막은 루트에 렌더링될 컴포넌트를 실제로 등록해야한다.
     * render 함수를 두개로 나눠 초기 렌더링과 업데이트를 구분해서 수행하자
     1. render 함수에서는 루트와 루트 컴포넌트를 options에 등록하고 렌더링한다
     2. _render 함수는 실제 렌더링을 수행한다.
  4. setState 함수가 실행되면 _render가 실행되도록 수정한다.
  5. render함수를 통해 실제적인 렌더링 수행하기

* 5-앞서 작성한 내용을 모듈화를 적용해 관리해보자
  1. MyReact 함수는 core 폴더에서 관리하자
  2. debounceFrame 함수는 utils 폴더에서 관리하자
  3. 컴포넌트는 components 폴더에서 관리하자