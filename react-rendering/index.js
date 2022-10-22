const ReactDOM = {
    createRoot(root) {
        this.root = root
        return this
    },
    render(element) {
        const root = this.root
        const cloneElement = element.cloneNode(true)

        const newElements = [ ...cloneElement.childNodes ]
        const oldElements = [ ...root.childNodes ]
        console.log(newElements, oldElements)
        const maxLength = Math.max(newElements.length, oldElements.length)
        for (let i = 0; i < maxLength; i++) {
            updateElement(root, newElements[i], oldElements[i])
        } 
    }
}

function updateElement(root, newElement, oldElement) {
    if (!newElement && oldElement) {
        return oldElement.remove()
    }

    if (newElement && !oldElement) {
        return root.appendChild(newElement)
    }

    if (newElement instanceof Text && oldElement instanceof Text) {
        if (newElement.nodevalue === oldElement.nodeValue) return
        return (oldElement.nodeValue = newElement.nodeValue)
    }

    if (newElement.nodeName !== oldElement.nodeName) {
        const index = [ ...root.childNodes ].indexOf(oldElement)
        return (
            oldElement.remove(),
            root.appendChild(newElement, index)
        )
    }

    updateAttribute(oldElement, newElement)

    const newChildren = [ ...newElement.childNodes ]
    const oldChildren = [ ...oldElement.childNodes ]
    const maxLength = Math.max(newChildren.length, oldChildren.length)
    for (let i = 0; i < maxLength; i++) {
        updateElement(oldElement, newChildren[i], oldChildren[i])
    }
}

function updateAttribute(oldElement, newElement) {
    const oldProps = [ ...oldElement.attributes ]
    const newProps = [ ...newElement.attributes ]

	for (const {name, value} of newProps) {
        if (value === oldElement.getAttribute(name)) continue;
        oldElement.setAttribute(name, value);
    }
      
    for (const {name} of oldProps) {
        if (newElement.getAttribute(name) !== undefined) continue;
        oldElement.removeAttribute(name);
    }
}

const root = ReactDOM.createRoot(
    document.querySelector('#app')
);

function tick() {
    const element = document.createElement('div')
    const h1 = document.createElement('h1')
    h1.innerText = 'Hello, World'
    const h2 = document.createElement('h2')
    h2.innerText = `It is ${new Date().toLocaleTimeString()}.`
    element.appendChild(h1)
    element.appendChild(h2)

    root.render(element);
}
  
setInterval(tick, 1000);