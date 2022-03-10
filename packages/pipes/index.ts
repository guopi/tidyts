declare global {
    interface Object {
        let_<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R

        also_<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T
    }
}

function let_(this: Object) {
    if (arguments.length > 1) {
        const args = Array.from(arguments)
        args[0] = this
        return arguments[0].apply(null, args)
    } else {
        return arguments[0](this)
    }
}

function also_(this: Object) {
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

export function enableTidyPipes() {
    const proto = Object.prototype
    defineExtensionFunction(proto, 'let_', let_)
    defineExtensionFunction(proto, 'also_', also_)
}
