import * as console from 'console'

export function runQuietly<R>(action: () => R): R | undefined {
    try {
        return action()
    } catch (e) {
        console.log('runQuietly', e)
        return undefined
    }
}
