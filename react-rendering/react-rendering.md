# 리액트의 렌더링 모델
리액트의 렌더링 모델은 기본적으로 다음과 같은 인터페이스를 가진다

1. `ReactDOM.createRoot()`에 DOM 엘리먼트(`app`)를 전달한다.
2. 생성된 객체의 `render` 메서드에 React 엘리먼트를 전달한다.

```javaScript
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
```

렌더링된 엘리먼트를 업데이트하기 위해서는 새로운 React 엘리먼트를 생성해야 한다

- 기본적으로 React 엘리먼트는 불변 객체이다. → 싱글톤 패턴
- 가상 DOM(React 엘리먼트) 비교 과정(Diff)을 거쳐 필요한 부분만 렌더링한다.

```javaScript
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

# 직접 구현해보기 (객체 방식)
## 구성요소
ReactDOM - createRoot() -> 실제 DOM을 가상 DOM으로 전환
         - render() -> 가상 DOM을 실제 DOM으로 전환
## ReactDOM 인스턴스 구성하기
* createRoot(rootDOM)
  * this.root에 전달받은 rootDOM을 할당
  * this를 반환
* render(element)
  * element 자식 요소들을 배열로 할당 
  * root의 자식 요소들을 배열로 할당
  * 생성된 두 배열을 비교후 this.root에 실제 렌더링 수행
