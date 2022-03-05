import { DictOf } from '@tidyts/base'

export function dictFilter<V>(
    src: DictOf<V>,
    predicate: (k: string, v: V) => unknown,
    dest ?: DictOf<V>
): DictOf<V> {
    const ret = dest ?? {}
    for (const e of Object.entries(src)) {
        const v = e[1]
        const k = e[0]
        if (predicate(k, v)) {
            ret[k] = v
        }
    }
    return ret
}

export function dictMap<V, R>(
    src: DictOf<V>,
    valueMapper: (v: V) => R,
    keyMapper?: (k: string) => string,
    dest?: DictOf<R>
): DictOf<R> {
    const ret = dest ?? {}
    for (let [k, v] of Object.entries(src)) {
        if (keyMapper)
            k = keyMapper(k)
        ret[k] = valueMapper(v)
    }
    return ret
}

