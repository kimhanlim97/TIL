export const ReactDOM = {
    createRoot(root) {
        this.root = root
        return this
    },
    render(element) {
        // for oldElements
        const root = this.root

        // for newElements
        const wrapper = document.createElement('div')
        const cloneElement = element.cloneNode(true)
        wrapper.appendChild(cloneElement)

        // render with diff
        const newElements = [ ...wrapper.childNodes ]
        const oldElements = [ ...root.childNodes ]
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
        if (newElement.nodeValue === oldElement.nodeValue) return
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