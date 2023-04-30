import { useState, useEffect } from 'react'

export const useAwait = <T extends any>(promise: Promise<T>) => {
    const [value, setValue] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)
        promise
            .then((data) => {
                setValue(data)
            })
            .catch((e) => {
                setError(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [promise])

    return { value, loading, error }
}
