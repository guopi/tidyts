export type NonNilOf<T> = Exclude<T, undefined | null>
export type DictOf<T> = {
    [key: string]: T
}

declare global {
    interface Object {
        txCall<T, R>(this: T, fn: (self: T) => R): R

        txCall<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R

        txAlso<T>(this: T, fn: (self: T) => any): T

        txAlso<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T
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


