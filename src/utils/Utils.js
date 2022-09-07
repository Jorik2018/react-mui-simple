export function debounce(fn, ms) {
    let timer
    return _ => {
        clearTimeout(timer)
        timer = setTimeout(_ => {
            timer = null;
            fn.apply(this, [window.innerWidth,window.innerHeight])
        }, ms?ms:500)
    };
}