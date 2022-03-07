import { DictOf, NonNilOf } from '@tidyts/base'

export type ArrayElementFunction<T, R> = (v: T, index: number, array: T[]) => R
export type ArrayElementGroup<K, T> = [K, T[]]

export function compareAny(a: any, b: any): number {
    if (a === b)
        return 0
    return a < b ? -1 : 1
}

export function arrayIsEmpty<T>(array: T[]) {
    return array.length === 0
}

export function arrayIsNotEmpty<T>(array: T[]) {
    return array.length > 0
}

export function arrayMap<T, R>(
    array: T[],
    mapper: ArrayElementFunction<T, R>,
    dest?: R[],
): R[] {
    const length = array.length
    const ret = dest ?? []
    for (let i = 0; i < length; i++) {
        ret.push(mapper(array[i], i, array))
    }
    return ret
}

export function arrayMapNonNil<T, R>(
    array: T[],
    mapper: ArrayElementFunction<T, R>,
    dest?: NonNilOf<R>[],
): NonNilOf<R>[] {
    const length = array.length
    const ret = dest ?? []
    for (let i = 0; i < length; i++) {
        const r = mapper(array[i], i, array)
        if (r != null) {
            ret.push(r as NonNilOf<R>)
        }
    }
    return ret
}

export function arrayReject<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>,
    dest?: T[]
): T[] {
    const ret = dest ?? []
    const length = array.length
    for (let i = 0; i < length; i++) {
        const v = array[i]
        if (!predicate(v, i, array)) {
            ret.push(v)
        }
    }
    return ret
}

export function arrayJoinWith<T>(array: T[], separator: T, dest?: T[]): T[] {
    const ret = dest ?? []
    const length = array.length
    for (let i = 0; i < length; i++) {
        if (i !== 0) {
            ret.push(separator)
        }
        ret.push(array[i])
    }
    return ret
}

export function arrayAny<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): boolean {
    return array.findIndex(predicate) >= 0
}

export function arrayNone<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): boolean {
    return array.findIndex(predicate) < 0
}

export function arrayAll<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): boolean {
    const length = array.length
    for (let i = 0; i < length; i++) {
        if (!predicate(array[i], i, array))
            return false
    }
    return true
}

export function arrayFirst<T>(array: T[]): T {
    if (array.length === 0) throw new Error('Array is empty.')
    return array[0]
}

export function arrayFirstOrUndefined<T>(array: T[]): T {
    return array[0]
}

export function arraySecond<T>(array: T[]): T {
    if (array.length < 2) throw new Error('Array[1] NOT exists.')
    return array[1]
}

export function arraySecondOrUndefined<T>(array: T[]): T {
    return array[1]
}

export function arrayLast<T>(array: T[]): T {
    const length = array.length
    if (length === 0) throw new Error('Array is empty.')
    return array[length - 1]
}

export function arrayLastOrUndefined<T>(array: T[]): T | undefined {
    return array[array.length - 1]
}

export function arrayFilter<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>,
    dest?: T[]
): T[] {
    const ret = dest ?? []
    const length = array.length
    for (let i = 0; i < length; i++) {
        const v = array[i]
        if (predicate(v, i, array)) {
            ret.push(v)
        }
    }
    return ret
}

export function arrayFilterNonNil<T>(array: T[], dest?: NonNilOf<T>[]): NonNilOf<T>[] {
    const ret = dest ?? []
    for (const v of array) {
        if (v != null) {    // note: DO NOT USE !== operator
            ret.push(v as NonNilOf<T>)
        }
    }
    return ret
}

export function arrayRemoveAllValues<T>(array: T[], v: T): boolean {
    let ret = false
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] == v) {
            array.splice(i, 1)
            ret = true
        }
    }
    return ret
}

export function arrayRemoveAllIf<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): boolean {
    let ret = false
    for (let i = array.length - 1; i >= 0; i--) {
        const v = array[i]
        if (predicate(v, i, array)) {
            array.splice(i, 1)
            ret = true
        }
    }
    return ret
}

export function arrayRemoveFirstValue<T>(array: T[], v: T): boolean {
    const length = array.length
    for (let i = 0; i < length; i++) {
        if (array[i] === v) {
            array.splice(i, 1)
            return true
        }
    }
    return false
}

export function arrayRemoveFirstIf<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): T | undefined {
    const length = array.length
    for (let i = 0; i < length; i++) {
        const v = array[i]
        if (predicate(v, i, array)) {
            array.splice(i, 1)
            return v
        }
    }
    return undefined
}

export function arrayRemoveLastValue<T>(array: T[], v: T): boolean {
    for (let i = array.length - 1; i >= 0; i--) {
        if (array[i] === v) {
            array.splice(i, 1)
            return true
        }
    }
    return false
}

export function arrayRemoveLastIf<T>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): T | undefined {
    for (let i = array.length - 1; i >= 0; i--) {
        const v = array[i]
        if (predicate(v, i, array)) {
            array.splice(i, 1)
            return v
        }
    }
    return undefined
}

export function arraySorted<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    return array.length !== 0
        ? [...array].sort(compareFn as any)
        : []
}

export function arraySortedDescending<T>(
    array: T[],
    compareFn?: (a: T, b: T) => number
): T[] {
    return array.length !== 0
        ? [...array].sort(compareFn as any).reverse()
        : []
}

export function arraySortedBy<T>(
    array: T[],
    selector: (v: T) => unknown
): T[] {
    return array.length !== 0
        ? [...array].sort((a, b) => compareAny(selector(a), selector(b)))
        : []
}

export function arraySortedByDescending<T>(
    array: T[],
    selector: (v: T) => unknown
): T[] {
    return array.length !== 0
        ? [...array].sort((a, b) => compareAny(selector(b), selector(a)))
        : []
}

async function arrayMapAsync<T, R>(
    array: T[],
    parallel: boolean,
    mapper: (v: T) => Promise<R>
): Promise<R[]> {
    if (array.length === 0)
        return []

    if (parallel) {
        return Promise.all(array.map(mapper))
    } else {
        const ret: R[] = []
        for (const v of array) {
            ret.push(await mapper(v))
        }
        return ret
    }
}

export function arrayDistinct<T>(array: T[]): T[] {
    return Array.from(new Set<T>(array))
}

export function arrayDistinctBy<T, K>(array: T[], keySelector: (v: T) => K): T[] {
    const ret: T[] = []
    const keys = new Set<K>()
    for (const v of array) {
        const key = keySelector(v)
        if (!keys.has(key)) {
            ret.push(v)
            keys.add(key)
        }
    }
    return ret
}

export function arrayFindLastIf<T, K>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): T | undefined {
    for (let i = array.length - 1; i > -1; i--) {
        const v = array[i]
        if (predicate(v, i, array)) {
            return v
        }
    }
    return undefined
}

export function arrayFindLastIndexIf<T, K>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): number {
    for (let i = array.length - 1; i > -1; i--) {
        if (predicate(array[i], i, array)) {
            return i
        }
    }
    return -1
}

export function arrayCountIf<T, K>(
    array: T[],
    predicate: ArrayElementFunction<T, unknown>
): number {
    let count = 0
    for (let i = array.length - 1; i > -1; i--) {
        if (predicate(array[i], i, array)) {
            count++
        }
    }
    return count
}

export function arraySum(array: number[]): number {
    let sum = 0
    for (const v of array) {
        sum += v
    }
    return sum
}

export function arraySumBig(array: bigint[]): bigint {
    let sum = 0n
    for (const v of array) {
        sum += v
    }
    return sum
}

export function arrayMinOrUndefined<T>(array: T[]): T | undefined {
    let length = array.length
    if (length === 0)
        return undefined
    let min = array[length - 1]
    for (let i = length - 2; i >= 0; i--) {
        const v = array[i]
        if (v < min)
            min = v
    }
    return min
}

export function arrayMaxOrUndefined<T>(array: T[]): T | undefined {
    let length = array.length
    if (length === 0)
        return undefined

    let max = array[length - 1]
    for (let i = length - 2; i >= 0; i--) {
        const v = array[i]
        if (v > max)
            max = v
    }
    return max
}

export function arraySumBy<T>(
    array: T[],
    selector: ArrayElementFunction<T, number>
): number {
    let sum = 0
    for (let i = array.length - 1; i >= 0; i--) {
        sum += selector(array[i], i, array)
    }
    return sum
}

export function arraySumBigBy<T>(
    array: T[],
    selector: ArrayElementFunction<T, bigint>
): bigint {
    let sum = 0n
    for (let i = array.length - 1; i >= 0; i--) {
        sum += selector(array[i], i, array)
    }
    return sum
}

export function arrayMaxByOrUndefined<T, R>(
    array: T[],
    selector: ArrayElementFunction<T, R>
): R | undefined {
    const length = array.length
    if (length === 0) {
        return undefined
    }
    let max = selector(array[length - 1], 0, array)
    for (let i = length - 2; i >= 0; i--) {
        const r = selector(array[i], i, array)
        if (r > max) {
            max = r
        }
    }
    return max
}

export function arrayMinByOrUndefined<T, R>(
    array: T[],
    selector: ArrayElementFunction<T, R>
): R | undefined {
    const length = array.length
    if (length === 0) {
        return undefined
    }
    let min = selector(array[length - 1], 0, array)
    for (let i = length - 2; i >= 0; i--) {
        const r = selector(array[i], i, array)
        if (r < min) {
            min = r
        }
    }
    return min
}

export function arrayMapToDict<T, R, D extends DictOf<R> = DictOf<R>>(
    array: T[],
    mapper: ArrayElementFunction<T, [string, R]>,
    dest ?: D
): D {
    const ret: any = dest ?? {}
    const length = array.length
    for (let i = 0; i < length; i++) {
        const [key, v] = mapper(array[i], i, array)
        ret[key] = v
    }
    return ret
}

export function arrayMapToSet<T, R>(
    array: T[],
    mapper: ArrayElementFunction<T, R>,
    dest ?: Set<R>
): Set<R> {
    const ret = dest ?? new Set<R>()
    const length = array.length
    for (let i = 0; i < length; i++) {
        const r = mapper(array[i], i, array)
        ret.add(r)
    }
    return ret
}

export function arrayMapToMap<T, K, V>(
    array: T[],
    mapper: ArrayElementFunction<T, [K, V]>,
    dest ?: Map<K, V>
): Map<K, V> {
    const ret = dest ?? new Map<K, V>()
    const length = array.length
    for (let i = 0; i < length; i++) {
        const [key, v] = mapper(array[i], i, array)
        ret.set(key, v)
    }
    return ret
}

export function arrayIntersect<T>(
    array: T[],
    list: Iterable<T> | readonly T[] | Set<T>
): T[] {
    if (array.length === 0) return []

    const set = list instanceof Set ? list : new Set<T>(list)
    if (set.size === 0) return []
    return array.filter(v => set.has(v))
}

export function arrayExclude<T>(
    array: T[],
    list: Iterable<T> | readonly T[] | Set<T>
): T[] {
    if (array.length === 0) return []

    const set = list instanceof Set ? list : new Set<T>(list)
    if (set.size === 0) return [...array]
    return array.filter(v => !set.has(v))
}

export function arrayChunk<T>(array: T[], size: number): T[][] {
    const length = array.length
    if (size <= 0 || length === 0)
        return [array]

    const ret: T[][] = []
    for (let i = 0; i < length; i += size) {
        ret.push(array.slice(i, i + size))
    }
    return ret
}

export function arrayRight<T>(array: T[], size: number): T[] {
    if (size <= 0) return []
    return array.slice(-size)
}

export function arrayLeft<T>(array: T[], size: number): T[] {
    if (size <= 0) return []
    return array.slice(0, size)
}

export function arrayGroupBy<T, K>(array: T[], selector: (e: T) => K): Array<ArrayElementGroup<K, T>> {
    const ret: Array<ArrayElementGroup<K, T>> = []
    for (const e of array) {
        const key = selector(e)
        const group = ret.find(g => g[0] == key)
        if (group) {
            group[1].push(e)
        } else {
            ret.push([key, [e]])
        }
    }
    return ret
}
