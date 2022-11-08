const React = require('../react/React')

const ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED // core의 ReactSharedInternals.js

// if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
//   ReactSharedInternals.ReactCurrentDispatcher = {
//     current: null,
//   }
// }
/*...*/

module.exports = ReactSharedInternals