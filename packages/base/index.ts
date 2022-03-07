export type NonNilOf<T> = Exclude<T, undefined | null>
export type DictOf<T> = {
    [key: string]: T
}

