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

export function dictReject<V>(
    src: DictOf<V>,
    predicate: (k: string, v: V) => unknown,
    dest ?: DictOf<V>
): DictOf<V> {
    const ret = dest ?? {}
    for (const [k, v] of Object.entries(src)) {
        if (!predicate(k, v)) {
            ret[k] = v
        }
    }
    return ret
}

export function dictMap<V, R>(
    src: DictOf<V>,
    mapper: (k: string, v: V) => [string, R] | undefined,
    dest?: DictOf<R>
): DictOf<R> {
    const ret = dest ?? {}
    for (const [k, v] of Object.entries(src)) {
        const r = mapper(k, v)
        if (r)
            ret[r[0]] = r[1]
    }
    return ret
}


