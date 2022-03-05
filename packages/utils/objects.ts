export function pick<T, K extends keyof T>(src: T, ...keys: K[]): Pick<T, K> {
    const ret: any = {}
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        ret[k] = src[k]
    }
    return ret
}
