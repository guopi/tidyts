declare global {
    interface Object {
        pipeWith_<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R

        alsoWith_<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T
    }
}

function pipeWith_(this: Object) {
    if (arguments.length > 1) {
        const args = Array.from(arguments)
        args[0] = this
        return arguments[0].apply(null, args)
    } else {
        return arguments[0](this)
    }
}

function alsoWith_(this: Object) {
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
    defineExtensionFunction(proto, 'pipeWith_', pipeWith_)
    defineExtensionFunction(proto, 'alsoWith_', alsoWith_)
}
