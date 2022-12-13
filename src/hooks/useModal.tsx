import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { modalContentAtom } from '../jotai'

export const useModal = () => {
    const setModalContent = useSetAtom(modalContentAtom)

    const showModal = useCallback((content: JSX.Element) => {
        setModalContent((prev) => [...prev, content])

        return () => {
            setModalContent((prev) => {
                const index = prev.findIndex((p) => p === content)
                return [...prev.slice(0, index), ...prev.slice(index + 1)]
            })
        }
    }, [])

    return showModal
}
