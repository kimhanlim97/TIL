let currentStateKey = 0
const states = []
function useState (initState) {
    if (states.length === currentStateKey) {
        states.push(initState)
    }
    
    const state = states[currentStateKey]
    function setState(newState) {
        if (state === newState) return
        if (JSON.stringify(state) === JSON.stringify(newState)) return

        states[currentStateKey] = newState
        render()
    }

    return [ state, setState ]
}

function Counter () {
  const [count, setCount] = useState(1);

  window.incrementCount = () => setCount(count + 1);

  return `
    <div>
      <strong>count: ${count} </strong>
      <button onclick="incrementCount()">1 증가</button>
    </div>
  `;
}

function Cat () {
    const [cat, setCat] = useState({
        catMeow: '야옹!',
        catCount: 1,
    });
  
    function countMeow(newCount) {
        cat.catCount = newCount
        setCat(cat)
        cat.catMeow = cat.catMeow + ' 야옹!'
        setCat(cat)
    }

    window.incrementCat = () => countMeow(cat.catCount + 1)
    window.decrementCat = () => countMeow(cat.catCount - 1)
  
    return `
        <div>
            <p>고양이가 ${cat.catCount}번 울어서 ${cat.catMeow} </p>
            <button onclick="incrementCat()">증가</button>
            <button onclick="decrementCat()">감소</button>
        </div>
    `;
  }
  
  function render () {
    app.innerHTML = `
      <div>
        ${Counter()}
        ${Cat()}
      </div>
    `;
  }

render();