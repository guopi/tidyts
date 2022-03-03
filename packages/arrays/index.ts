export type X = 1

declare global {
    interface Object {
        let<T, R>(this: T, fn: (self: T) => R): R

        letWith<T extends S, R, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => R, ...args: ARGS): R

        also<T>(this: T, fn: (self: T) => any): T

        alsoWith<T extends S, S, ARGS extends any[]>(this: T, fn: (self: S, ...args: ARGS) => any, ...args: ARGS): T
    }
}

((proto) => {
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
})(Object.prototype)

function f1() {
    function add2(s1: string) {
        console.log('add2 s1', s1)
        return s1 + '+++' + 2
    }

    function add(s1: string, s2: string) {
        console.log('add:s1', s1, 's2', s2)
        return s1 + '+++' + s2
    }

    console.log('AA'.letWith(add, '999'))
    console.log('AA'.letWith((x,y) =>x+y, '999'))
    console.log('AA'.let(add2))

    'AAsdfsd'.also(add2)

    let s = '阿斯蒂芬阿萨德'
    s.also(s => console.log(s + 'XXXX'))
    'ZZZ'.also(s => console.log(s + 'XXXX'))
    'ZZZ'.alsoWith((s, a) => console.log(s + 'XXXX' + a), 'aaa')
}

f1()
