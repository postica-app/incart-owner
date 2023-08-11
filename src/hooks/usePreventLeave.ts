import { useEffect } from 'react'

const listener = (event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = ''
}

export const usePreventLeave = (props: { enabled: boolean }) => {
    const { enabled } = props

    useEffect(() => {
        if (enabled) {
            window.addEventListener('beforeunload', listener)
        } else {
            window.removeEventListener('beforeunload', listener)
        }
        return () => {
            window.removeEventListener('beforeunload', listener)
        }
    }, [enabled])

    return
}
