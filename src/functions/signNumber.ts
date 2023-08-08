export function signNumber(num: number) {
    if (num > 0) {
        return `+${num}`
    }
    return `${num}`
}
