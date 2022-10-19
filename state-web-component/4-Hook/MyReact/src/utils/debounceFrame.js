export function debounceFrame(cb) {
    let nextFrameCb;
    return () => {
        if (nextFrameCb) cancelAnimationFrame(nextFrameCb)
        nextFrameCb = requestAnimationFrame(cb)
    }
}