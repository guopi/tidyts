export function stringIsEmpty(s: string): boolean {
    return s.length === 0
}

export function stringIsNotEmpty(s: string): boolean {
    return s.length !== 0
}

export function subStringAfterFirst<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.indexOf(findstr)
    return p >= 0 ? s.substring(p + findstr.length) : valueIfNotFound
}

export function subStringAfterLast<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.lastIndexOf(findstr)
    return p >= 0 ? s.substring(p + 1) : valueIfNotFound
}

export function subStringBeforeFirst<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.indexOf(findstr)
    return p >= 0 ? s.substring(0, p) : valueIfNotFound
}

export function subStringBeforeLast<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.lastIndexOf(findstr)
    return p >= 0 ? s.substring(0, p) : valueIfNotFound
}

export function stripBomFEFF(s: string) {
    if (s.charCodeAt(0) === 0xFEFF) {
        return s.slice(1)
    }
    return s
}
