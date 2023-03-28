import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default () => {
    const goto = useNavigate()
    useEffect(() => {
        goto('/product')
    }, [])
    return <>아니진짜요?</>
}
