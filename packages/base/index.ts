export type NonNilOf<T> = Exclude<T, undefined | null>
export type DictOf<T> = {
    [key: string]: T
}

declare global {
    interface Object {
        txCall<T, R>(this: T, fn: (self: T) => R): R

        txCall<T, R, A1>(this: T, fn: (self: T, a1: A1) => R, a1: A1): R

        txCall<T, R, A1, A2>(this: T, fn: (self: T, a1: A1, a2: A2) => R, a1: A1, a2: A2): R

        txCall<T, R, A1, A2, A3>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3) => R, a1: A1, a2: A2, a3: A3): R

        txCall<T, R, A1, A2, A3, A4>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4) => R, a1: A1, a2: A2, a3: A3, a4: A4): R

        txCall<T, R, A1, A2, A3, A4, A5>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => R, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5): R

        txCall<T, R, A1, A2, A3, A4, A5, A6>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => R, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6): R

        txCall<T, R, A1, A2, A3, A4, A5, A6, A7>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7) => R, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7): R

        txAlso<T>(this: T, fn: (self: T) => any): T

        txAlso<T, A1>(this: T, fn: (self: T, a1: A1) => any, a1: A1): T

        txAlso<T, A1, A2>(this: T, fn: (self: T, a1: A1, a2: A2) => any, a1: A1, a2: A2): T

        txAlso<T, A1, A2, A3>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3) => any, a1: A1, a2: A2, a3: A3): T

        txAlso<T, A1, A2, A3, A4>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4) => any, a1: A1, a2: A2, a3: A3, a4: A4): T

        txAlso<T, A1, A2, A3, A4, A5>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5) => any, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5): T

        txAlso<T, A1, A2, A3, A4, A5, A6>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6) => any, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6): T

        txAlso<T, A1, A2, A3, A4, A5, A6, A7>(this: T, fn: (self: T, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7) => any, a1: A1, a2: A2, a3: A3, a4: A4, a5: A5, a6: A6, a7: A7): T
    }
}

function txCall(this: Object) {
    if (arguments.length > 1) {
        const args = Array.from(arguments)
        args[0] = this
        return arguments[0].apply(null, args)
    } else {
        return arguments[0](this)
    }
}

function txAlso(this: Object) {
    if (arguments.length > 1) {
        const args = Array.from(arguments)
        args[0] = this
        arguments[0].apply(null, args)
    } else {
        arguments[0](this)
    }
    return this
}

export function defineExtensionFunction(proto: any, name: string, fn: Function) {
    const current = proto[name]
    if (current !== fn) {
        if (current !== undefined)
            throw new Error(`${name} already defined`)

        Object.defineProperty(proto, name, { value: fn })
    }
}

export function enableTidyExtends() {
    const proto = Object.prototype
    defineExtensionFunction(proto, 'txCall', txCall)
    defineExtensionFunction(proto, 'txAlso', txAlso)
}


