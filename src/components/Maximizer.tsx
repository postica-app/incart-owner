import { useEffect, useRef, useState } from 'react'

export const Maximizer: React.FC<
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
        children: (props: { height: number; width: number }) => React.ReactNode
    }
> = ({ children, ...props }) => {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const listener = () => {
            if (ref.current) {
                setHeight(ref.current.clientHeight)
                setWidth(ref.current.clientWidth)

                console.log({
                    height: ref.current.clientHeight,
                    width: ref.current.clientWidth,
                })
            }
        }

        listener()
        window.addEventListener('resize', listener)

        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [ref.current])

    return (
        <div
            {...props}
            style={{
                flex: 1,
                overflow: 'scroll',
                position: 'relative',
                ...(props.style || {}),
            }}
            ref={ref}
        >
            <div
                style={{
                    position: 'absolute',
                }}
            >
                {height
                    ? children({
                          height,
                          width,
                      })
                    : null}
            </div>
        </div>
    )
}
