// 모듈들의 대기소같은 곳
const ReactCurrentDispatcher = require('./ReactCurrentDispatcher')
/* ... */

const ReactSharedInternals = {
  ReactCurrentDispatcher,

  /* ... */
}

module.exports = ReactSharedInternals