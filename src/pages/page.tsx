import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default () => {
    const goto = useNavigate()

    useEffect(() => {
        goto('/product')
    }, [goto])

    return <></>
}
