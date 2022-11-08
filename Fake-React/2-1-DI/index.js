const React = require('./react/React')
const rendering = require('./Rendering')

rendering()

// 여러개의 컴포넌트에서 훅이 호출되는 상황을 가정합니다.
setInterval(() => {
    React.useState()
    React.useEffect()
}, 1000)

