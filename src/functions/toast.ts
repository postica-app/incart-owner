import _toast from 'react-hot-toast'

export const toast = (content: string, emoji?: string) =>
    _toast(content, {
        style: {
            fontSize: '5rem',
        },
        icon: emoji,
    })
