interface Cache<T = unknown> {
    expiresAt: number
    data: T
}

function parseCachedValue(cache: string | null) {
    if (!cache) throw ''

    try {
        const parsed = JSON.parse(cache) as Cache
        if (parsed.expiresAt < +new Date()) throw ''

        return parsed.data
    } catch (e) {
        throw e
    }
}

export const memo = <Args extends [], ReturnValue>(
    key: string,
    duration: number,
    action: (...arg: Args) => ReturnValue
) => {
    const func = async (...arg: Args): Promise<ReturnValue> => {
        try {
            const cachedValue = parseCachedValue(localStorage.getItem(key))
            return cachedValue as ReturnValue
        } catch (e) {
            let result = action(...arg)

            if (result instanceof Promise) {
                result = await result
            }

            localStorage.setItem(
                key,
                JSON.stringify({
                    expiresAt: duration + +new Date(),
                    data: result,
                })
            )

            return result
        }
    }

    func.ignoreCache = async (...arg: Args): Promise<ReturnValue> => {
        const result = action(...arg)

        if (result instanceof Promise) {
            return await result
        }

        localStorage.setItem(
            key,
            JSON.stringify({
                expiresAt: duration + +new Date(),
                data: result,
            })
        )

        return result
    }

    return func
}
