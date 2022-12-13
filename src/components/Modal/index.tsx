import { useAtom } from 'jotai'
import { modalContentAtom } from '@/jotai'
import styles from './styles'

export const Modal = () => {
    const [modalContent, setModalContent] = useAtom(modalContentAtom)

    if (!modalContent || modalContent.length === 0) return <></>

    return (
        <styles.Backdrop
            onClick={() => setModalContent((e) => (e ? e.slice(0, -1) : []))}
        >
            {modalContent.map((content) => (
                <styles.Modal
                    padding={6}
                    gap={6}
                    onClick={(e) => e.stopPropagation()}
                >
                    {content}
                </styles.Modal>
            ))}
        </styles.Backdrop>
    )
}
