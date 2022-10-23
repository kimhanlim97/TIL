## React.createElement란?

React는 JSX 없이 엘리먼트를 생성할 수 있는 함수를 제공한다.

예를 들어 다음 JSX로 작성된 코드는

```jsx
class Hello extends React.Component {
	render() {
		return <div>Hello {this.props.toWhat}</div>;
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);
```

아래처럼 JSX를 사용하지 않은 코드로 컴파일될 수 있다.

```jsx
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`)
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
```

## 유사하게 만들어보기

**자료구조**

입력: `React.createElement` (component or element, props, …children)

- component or element는 문자열 타입이거나 함수 객체 타입이다.
- props는 null이거나 객체 리터럴 타입이다.
- …children의 요소들은 null이거나 문자열 타입이거나 DOM 객체이다.

출력: `return` component or element

- component or element는 무조건 DOM 객체 타입이다.

**알고리즘**

1. element = string, props = null, children[n] = string
    1. 문자열 기반 엘리먼트 생성
    2. props는 null이라 고려할 필요 없음
    3. 생성한 DOM 노드의 자식으로 텍스트 노드 추가
2. element = string, props = null, children[n] = null
    1. 아무런 변화도 일어나지 않음
3. element = string, props = null, children[n] = DOM
    1. 생성한 DOM 노드에 자식으로 추가
4. element = string, props = null, children = 기타 다른 타입
    1. DOM 배열 속 요소가 HTMLElement를 상속받지 않을 경우 에러 반환
5. element = string, props = 인스턴스, children = All
    1. props가 객체형태로 전달되었는지 확인
    2. 맞다면 props를 순회하며 생성된 element에 setAttribute를 함
6. element = 함수 객체, props = All,  children = All
    1. 함수 호출 시 props 전달
7. element = 기타 다른 타입, props = All,  children = All
    1. 에러를 반환