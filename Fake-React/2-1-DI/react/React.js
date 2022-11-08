const { useState, useEffect } = require('./ReactHooks')
const ReactSharedInternals = require('./ReactSharedInternals') // 의존성을 주입받는 징검다리

const React = {
  useState,
  useEffect,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,

  /* ... */
}

module.exports = React