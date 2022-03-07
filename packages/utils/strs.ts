export function strIsEmpty(s: string): boolean {
    return s.length === 0
}

export function strNotEmpty(s: string): boolean {
    return s.length !== 0
}

export function substrAfterFirstMatch<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.indexOf(findstr)
    return p >= 0 ? s.substring(p + findstr.length) : valueIfNotFound
}

export function substrAfterLastMatch<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.lastIndexOf(findstr)
    return p >= 0 ? s.substring(p + findstr.length) : valueIfNotFound
}

export function substrBeforeFirstMatch<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.indexOf(findstr)
    return p >= 0 ? s.substring(0, p) : valueIfNotFound
}

export function substrBeforeLastMatch<R>(s: string, findstr: string, valueIfNotFound: R | string = s): string | R {
    const p = s.lastIndexOf(findstr)
    return p >= 0 ? s.substring(0, p) : valueIfNotFound
}

export function stripBomFEFF(s: string) {
    if (s.charCodeAt(0) === 0xFEFF) {
        return s.slice(1)
    }
    return s
}
