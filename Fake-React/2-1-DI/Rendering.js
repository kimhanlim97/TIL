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
