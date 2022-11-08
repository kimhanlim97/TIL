const ReactCurrentDispatcher = require('./ReactCurrentDispatcher')

// 의문점3. React는 dispatcher를 매번 호출하여 생성하는가? -> 그냥 에러처리를 위한 것이 아닐까
function resolveDispatcher() {
  const dispatcher = ReactCurrentDispatcher.current
  return dispatcher
}

function useState() {
  const dispatcher = resolveDispatcher()
  return dispatcher.useState()
}

function useEffect() {
  const dispatcher = resolveDispatcher()
  return dispatcher.useEffect()
}


module.exports =  {
    useState,
    useEffect,
}