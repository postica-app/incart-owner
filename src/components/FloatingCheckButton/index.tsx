import { Hexile } from '@haechi/flexile'
import { Button, styled } from 'incart-fe-common'
import { ComponentProps } from 'react'

const Wrapper = styled(Hexile, {
    position: 'fixed',
    bottom: '12rem',
    zIndex: 1,
    animated: true,
    left: '50%',
    '&>*': {
        animated: true,
    },
    variants: {
        visible: {
            true: {
                visibility: 'visible',
                transform: 'translateX(-50%) translateY(0px)',
                opacity: 1,
                '&>*': {
                    transform: 'scale(1)',
                },
            },
            false: {
                visibility: 'hidden',
                transform: 'translateX(-50%) translateY(6rem)',
                opacity: 0,
                '&>*': {
                    transform: 'scale(0.9)',
                },
            },
        },
    },
})

export const FloatingCheckButton: React.FC<{
    visible: boolean
    ghost: ComponentProps<typeof Button>
    normal: ComponentProps<typeof Button>
}> = (props) => (
    <Wrapper gap={3} visible={props.visible}>
        <Button ghost {...props.ghost} />
        <Button {...props.normal} />
    </Wrapper>
)
