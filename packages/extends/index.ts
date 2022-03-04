declare global {
    interface Object {
        let<T, R>(this: T, fn: (self: T) => R): R

        letWith<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R

        also<T>(this: T, fn: (self: T) => any): T

        alsoWith<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T
    }
}

export function enableTidyExtends() {
    const proto = Object.prototype
    if (typeof proto.let !== 'function') {
        proto.let = function _let<T, R>(this: T, fn: (self: T) => R): R {
            return fn(this)
        }
    }
    if (typeof proto.letWith !== 'function') {
        proto.letWith = function _letWith<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R {
            return fn(this, ...args)
        }
    }
    if (typeof proto.also !== 'function') {
        proto.also = function _also<T>(this: T, fn: (self: T) => any): T {
            fn(this)
            return this
        }
    }
    if (typeof proto.alsoWith !== 'function') {
        proto.alsoWith = function _alsoWith<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T {
            fn(this, ...args)
            return this
        }
    }
}


export * from './test1'
