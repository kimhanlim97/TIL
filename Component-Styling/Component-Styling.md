### CSS in CSS를 사용해 컴포넌트를 스타일링하는 법

[React 컴포넌트 CSS 스타일링 기본](https://www.daleseo.com/react-styling/)

[6 Reasons why you shouldn't style inline - World Of Dev](https://worldofdev.info/6-reasons-why-you-shouldnt-style-inline/)

**Inline Style**

Inline 스타일이 유용할 때

1. 적은 스타일 변화가 필요할 때
2. 오버라이딩이 필요할 때 (CSS 캐스케이딩 법칙에서 강력한 우선순위를 가지기 때문에)

Inline 스타일의 사용이 지양되는 이유

1. 가독성 측면에서 좋지 않다.
2. 스타일 유지보수성 측면에서 좋지 않다.
3. 오버라이딩이 강하기 때문에 접근성이 좋지 않다.
4. 웹 페이지 전반의 용량을 증가시키기 때문에 성능 측면에서도 좋지 않다.
5. 재사용이 불가능하다.

**External Stylesheet (BEM-클래스 네이밍)**

- 글로벌 네임 스페이스를 쓰기 때문에 클래스 이름의 중복 가능성이 높다
- 일반 `.css` 확장자를 사용해 스타일시트를 생성하고 link 태그를 통해 HTML 파일과 연결한다.
- Vanila JS에서 스타일을 적용할 수 있는 가장 보편적인 방법인 것 같다.

**CSS Modules**

- 고유의 네임 스페이스를 쓰기 때문에 클래스 이름의 중복 가능성이 낮다
- `.module.css` 확장자 사용해 css 모듈을 만들고 JS 파일에서 이를 임포트해 사용한다.
- webPack에서 사용하는 css-loader에서 지원되기 때문에 Vanila JS에서는 사용이 불가능하다

### CSS in JS를 통해 컴포넌트를 스타일링하는 법(Styled Components)

**CSS in JS란?**

- 기존에는 HTML, CSS, JS를 별도의 파일로 관리하는 것이 Best Practice로 여겨졌다.
- 하지만 컴포넌트기반 개발 방법이 주류가 됨에 따라 CSS도 컴포넌트에서 관리하는 방법이 등장했다
- 대부분의 CSS in JS 라이브러리들은 각 JS 파일마다 고유한 네임스페이스를 제공해 격리된 스타일을 사용할  수 있게 한다. → Styled Components도 마찬가지이다.

**Styled Components(CSS in JS)의 특징**

1. 스타일된 컴포넌트에는 자동으로 생성한 클래스 이름이 적용되기 때문에 클래스네이밍이 필요없다.
2. 스타일이 적용된 컴포넌트를 커스텀해서 반환하기 때문에 스타일의 재사용이 용이하다.
3. Styled Component를 통해서 설정된 스타일은 JS 파일마다 고유 CSS 네임스페이스를 부여한다
    
    → 전역 스타일을 따로 정의하지 않는 이상 각 컴포넌트는 고유한 스코프를 가진다.
    

**Styled Components(CSS in JS)의 간략한 사용법**

- `styled` 함수를 통해 컴포넌트 단위로 스타일을 정의할 수 있다.
- 기본 HTML 태그에 대한 스타일 정의 방법은 다음과 같다

```jsx
import React from 'react'
import styled from "styled-components";

const StyledButton = styled.button`
  // <button> HTML 엘리먼트에 대한 스타일 정의
`;

function Button(props) {
	return <StyledButton>{...props.children}</StyledButton>;
}

export default Button
```

- 컴포넌트에 대한 스타일 정의 방법은 다음과 같다

```jsx
import React from 'react'
import styled from "styled-components";
import Button from "./Button";

const StyledButton = styled(Button)`
  // <Button> React 컴포넌트에 스타일 정의
`;

export default StyledButton
```

- props를 활용하면 가변 스타일링도 가능하다

```jsx
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  // <button> HTML 엘리먼트에 대한 스타일 정의

  color: ${(props) => props.color || "gray"};
  background: ${(props) => props.background || "white"};
`;

function Button(props) {
	return (
		<StyledButton color={props.color} background={props.background}>
      {children}
    </StyledButton>
	)
}
```

- `createGlobalStyle` 함수를 통해 전역 스타일링을 할 수도 있다.

```jsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      // Global style을 적용할 컴포넌트 정의
    </>
  );
}

export default App;
```

### 컴포넌트 스타일링 방법 정하기

**지금 CSS in CSS에서 불편한 점 (CSS in JS와 비교했을 때)**

1. 스타일을 별도의 CSS 파일로 관리하는 문제
    - 조금 더 명시적으로 JS 파일 내에서 컴포넌트의 스타일을 정의하고 싶다
    - 조금 더 명시적으로 컴포넌트의 스타일을 재사용 가능하게 하고 싶다.
2. 클래스 이름과 관련된 문제
    - 어차피 컴포넌트 단위로 스타일을 작성하기 때문에 일일이 클래스 네이밍을 하고 싶지 않다.
    - 거기다가 BEM을 적용하게 되면 클래스 이름이 너무 길어진다.
    - 향후 클래스 이름이 중복되는 일이 발생하지 않았으면 좋겠다. (현재 CSS 모듈 사용 불가능)
3. 컴포넌트 스타일의 스코프 문제
    
    → Styled Component처럼 컴포넌트의 독립적인 스타일을 유지하고 싶다.
    

**Styled Components의 문제해결 방식을 흉내내보자**

1. Styled Component에 착안하여 스타일을 JS파일에서 관리해보자
    - JS 내에서 스타일 시트를 생성하고 스타일을 정의하는 기능을 추가하자
    - 스타일 업데이트 시에는 변경된 부분만 업데이트 하도록 해보자
2. Styled Component에 착안하여 클래스 이름과 관련된 문제를 해결해보자
    - element에 랜덤한 클래스를 자동으로 부여하는 기능을 추가하자
3. Styled Component에 착안하여 컴포넌트 스타일의 스코프 문제를 해결해보자
    - 사실 컴포넌트의 스타일 별 스코프를 독립시키는 것은 현재 내 실력으로는 불가능하다
    - Shadow Root를 쓰는 방법도 있겠지만 그러면 글로벌 스타일 적용이 어려워진다.
    - 따라서 일단 이 부분은 구현하지 않는 걸로 하자 → 나중에 하자