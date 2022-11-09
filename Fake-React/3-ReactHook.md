## React Hook

### 자료 출처

[](https://goidle.github.io/react/in-depth-react-hooks_1/)

### React Hook의 Dispatcher 그리고 의존성 패턴

**의존성 패턴 자료 출처**

[JavaScript dependency injection in Node.js - introduction](https://tsh.io/blog/dependency-injection-in-node-js/)

개발자는 `react/React.js`로부터 `useState`나 `useEffect`와 같은 훅을 임포트해 사용합니다.

```jsx
// react/React.js

import { useState, useEffect, ... } from './ReactHooks'
import ReactSharedInternals from './ReactSharedInternals' // 의존성을 주입받는 징검다리

const React = {
  useState,
  useEffect,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,

  /* ... */
}

export default React
```

해당 코어 모듈에서 훅은 `react/ReactHooks.js`로부터 가져오고 있습니다.

```jsx
// react/ReactHooks.js

import ReactCurrentDispatcher from './ReactCurrentDispatcher'

function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current
  return dispatcher
}

export function useState(initialState) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useState(initialState)
}

export function useEffect(create, inputs) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useEffect(create, inputs)
}
```

`react/ReactHooks.js` 모듈은 `resolveDispatcher`함수를 통해 `ReactCurrentDispatcher` 의 `current` 프로퍼티를 반환하고, `useState`와 `useEffect` 등의 훅은 이를 토대로 각각에 맞는 기능을 반환하고 있습니다. `react/ReactCurrentDispatcher.js` 모듈로 가보겠습니다. 

```jsx
// react/ReactCurrentDispatcher.js

const ReactCurrentDispatcher = {
  current: null,
}

export default ReactCurrentDispatcher
```

`ReactCurrentDispatcher.current`에는 `null` 값이 설정되어 있습니다. 그렇다면 개발자에게 제공되는 훅들이 어떻게 `useState`나 `useEffect`의 기능들을 제공할 수 있는 것일까요?

그에 대한 답은 의존성 주입 패턴에 있습니다. React의 `react` 패키지는 의존성을 자신이 만들지 않고 외부에서 주입받습니다. 그리고 의존성을 주입하는 모듈과 react 패키지 사이에 중간자를 두어 의존성을 주입받습니다. 그 중간자는 `shared/ReactSharedInternals.js` 모듈이고 react 패키지 내부에서도 의존성을 주입받아야 하는 모듈들을 모아놓은 대기소 `react/ReactSharedInternals.js`를 통해 한번 더 우회합니다. 다음은 `react/ReactSharedInternals.js` 모듈입니다.

```jsx
// react/ReactSharedInternals.js

import ReactCurrentDispatcher from './ReactCurrentDispatcher'
/* ... */

const ReactSharedInternals = {
  ReactCurrentDispatcher,
  /* ... */
}

export default ReactSharedInternals
```

다음은 `shared/ReactSharedInternals.js` 모듈, 즉 의존성 주입의 중간자 역할을 하는 모듈입니다.

```jsx
// shared/ReactSharedInternals.js

import React from 'react'

const ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED // core의 ReactSharedInternals.js

if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
  ReactSharedInternals.ReactCurrentDispatcher = {
    current: null,
  }
}
/* ... */

export default ReactSharedInternals
```

여기서 의문이 2가지가 생깁니다. 첫번째 의문은 React는 왜 react 패키지를, 그 중에서도 dispatcher를 의존성 주입 패턴을 통해 관리하는 것일까요? 그에 대한 대답은 의존성 패턴이 가진 특징에 있습니다. 의존성 패턴은 모듈의 확장성을 높여줍니다. dispatcher는 여러모로 재활용될 가능성이 높은 기능입니다. dispatcher는 recoil이나 redux와 같은 전역 상태 관리에도 사용될 수 있고 뿐만 아니라 컴포넌트가 가지는 훅의 종류도 여러가지라 이에 해당하는 기능을 통합적으로 제공해야 합니다. 뿐만 아니라 동일한 훅이라고 해도 컴포넌트가 렌더링되는 과정에 따라 약간씩 변형 및 수정 과정을 거치기까지 합니다. 따라서 dispatcher는 가능성이 열려 있는, 확장성이 거의 무한대에 가까운 형태로 디자인할 필요가 있습니다.

또한 의존성 패턴은 의존성을 주입하기 위해 반드시 이를 이용하려는 패키지를 미리 정의해두어야 한다는 특징을 가지고 있습니다. 즉, 리액트에서 개발자가 훅을 사용하기 위해서는 ReactCurrentDispatcher의 `useState`나 `useEffect`가 미리 정의되어 있어야 한다는 것입니다. 그렇지 않으면 의존성을 주입받기 전에 ReactCurrentDispatcher의 값은 `null`이기 때문에 훅 사용에 있어서 참조 에러가 발생합니다. 이는, 훅이 사용되는 컨텍스트를 엄밀하게 강제하는 효과가 있습니다. `useState`와 `useEffect`가 정의되는 순간은 Render Phase이고 이는 컴포넌트 호출 내부에서 일어나야 합니다. 따라서 `useState`나 `useEffect`가 컴포넌트 외부에서 호출되면 참조 에러가 발생하게 됩니다. `react` 패키지는 이러한 의존성 패턴을 통해 개발자에게 각각의 훅의 문맥에 맞는 hot path를 강요합니다.

두번째 의문은 react 패키지의 `react/ReactCurrentDispatcher.js` 모듈이 실제로 어떤 방식으로 의존성을 주입받을까요? 이를 직접 느껴보기 위해 예시 코드를 작성해보았습니다.

```jsx
// Rendering.js
const ReactSharedInternals = require('./shared/ReactSharedInternals')

// ReactSharedInternals 중간자를 통해 ReactCurrentDispatcher에 의존성을 주입합니다.
function rendering() {
    let useStateCount = 0
    let useEffectCount = 0
    ReactSharedInternals.ReactCurrentDispatcher.current = {
        useState() {
            console.log('useState' + useStateCount++)
        },
        useEffect() {
            console.log('useEffect' + useEffectCount++)
        }
    }
}

module.exports = rendering
```

```jsx
// index.js
const React = require('./react/React')
const rendering = require('./Rendering')

rendering()

// 여러개의 컴포넌트에서 훅이 호출되는 상황을 가정합니다.
setInterval(() => {
    React.useState()
    React.useEffect()
}, 1000)
```

생각보다 정말 간단한데요. 그냥 중간자를 임포트해서 ReactCurrentDispatcher의 `current` 객체를 수정하는 방식으로 의존성을 주입하면 끝입니다. 하지만 만약 `rendering` 함수를 실행하지 않는다면 dispatcher가 `null`값을 참조하고 있다는 에러를 맞닿뜨리게 됩니다. 이는 앞서 설명했던 리액트가 전제하는 컨텍스트를 지키지 않았기 때문입니다. 훅들은 반드시 render phase에서 정의되어 dispatcher에 주입되고 컴포넌트와 연결되어야 합니다. (2-1-DI 폴더 참고)

위와 같은 훅 주입은 실제로 `react-reconciler/ReactFiberHooks.js`의 `renderWithHooks` 함수에서 일어납니다. 해당 함수는 대략적으로 다음과 같은 로직을 포함하고 있는 함수입니다.

```jsx
import ReactSharedInternal from 'shared/ReactSharedInternal'
const { ReactCurrentDispatcher } = ReactSharedInternal

export function renderWithHooks(/* ... */) {
	/* ... */

	ReactCurrentDispatcher.current = 
        nextCurrentHook === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate

	/* ... */
}
```