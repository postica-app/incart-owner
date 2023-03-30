import { useState, useEffect } from 'react'

export const useAsyncValue = <T extends any>(
    asyncFn: () => Promise<T>,
    deps: any[]
) => {
    const [value, setValue] = useState<T | null>(null)
    const [error, setError] = useState<unknown | null>(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const value = await asyncFn()
                setValue(value)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, deps)
    return { value, error, loading }
}
