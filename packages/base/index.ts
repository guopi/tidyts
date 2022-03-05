export type NonNilOf<T> = Exclude<T, undefined | null>
export type DictOf<T> = {
    [key: string]: T
}

declare global {
    interface Object {
        xCall<T, R>(this: T, fn: (self: T) => R): R

        xCall<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R

        xAlso<T>(this: T, fn: (self: T) => any): T

        xAlso<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T
    }
}

export function enableTidyExtends() {
    const proto = Object.prototype
    if (typeof proto.xCall !== 'function') {
        proto.xCall = function xCall<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R {
            return fn(this, ...args)
        }
    }
    if (typeof proto.xAlso !== 'function') {
        proto.xAlso = function xAlso<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T {
            fn(this, ...args)
            return this
        }
    }
}

