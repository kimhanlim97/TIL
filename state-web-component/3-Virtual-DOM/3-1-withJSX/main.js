// Virtual DOM을 Real DOM으로 변환하는 함수
function createElement(node) {
    // node의 텍스트 노드일 경우 텍스트 노드를 생성해 반환한다
    if (typeof node === 'string') {
        return document.createTextNode(node)
    }

    // node가 텍스트 노드가 아닐 경우 아래 로직을 따라 생성된 요소를 반환한다

    // node.type에 맞는 요소를 생성한다
    const $el = document.createElement(node.type)

    // node.props에 정의된 속성을 생성된 요소에 삽입한다
    Object.entries(node.props || {})
          .filter(([attr, value]) => value)
          .forEach(([attr, value]) => (
              $el.setAttribute(attr, value)
          ))
    
    // node.children에 명시된 자식 요소들을 순회하여 DOM으로 변환하고
    // 생성된 요소에 자식 요소들을 추가한다
    node.children.map(createElement)
                 .forEach(child => $el.appendChild(child))

    // 완성된 DOM을 반환한다
    return $el
}

// DOM을 업데이트하는 함수 -> Diff 알고리즘을 적용해 변경된 내용만 DOM에 반영
function updateElement(parent, newNode, oldNode, index = 0) {
    // 1. oldNode만 있는 경우
    if (!newNode && oldNode) {
        return parent.removeChild(parent.childNode[index])
    }

    // 2. newNode만 있는 경우
    if (newNode && !oldNode) {
        return parent.appenChild(createElement(newNode))
    }

    // 3. oldNode와 newNode 모두 text 타입일 경우
    if (typeof newNode.type === 'string' && typeof oldNode.type === 'string') {
        if (newNode === oldNode) return
        return parent.replaceChild(
            createElement(newNode),
            parent.childNodes[index]
        )
    }

    // 4. oldNode와 newNode의 타입이 다를 경우
    if (newNode.type !== oldNode.type) {
        return parent.replaceChild(
            createElement(newNode),
            parent.childNodes[index]
        )
    }

    // 5. oldNode와 newNode의 타입이 같을 경우 -> 둘 다 텍스트 타입인 경우는 3번에서 제외
    updateAttribute(
        parent.childNode[index],
        newNode.props || {},
        oldNode.props || {},
    )

    // 6. oldNode와 newNode의 모든 자식 태그를 순회하며 1-5의 내용을 반복한다
    const maxLength = Math.max(
        newNode.children.length,
        oldNode.children.length,
    )
    for (let i = 0; i < maxLength; i++) {
        updateElement(
          parent.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        )
    }
}

// 5. newNode와 oldNode의 attribute를 비교하여 변경된 부분만 반영한다
function updateAttribute(target, newProps, oldProps) {
    // 달라지거나 추가된 Props를 반영
    for (const [key, value] of Object.entries(newProps)) {
        if (oldProps[attr] === newProps[attr]) continue
        target.setAttribute(attr, value)
    }

    // 없어진 props를 attribute에서 제거
    for (const attr of Object.keys(oldProps)) {
        if (newProps[attr] !== undefined) continue
        target.removeAttribute(attr)
    }
}