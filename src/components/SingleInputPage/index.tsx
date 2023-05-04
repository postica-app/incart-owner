import { ReactComponent as Arrow } from 'incart-fe-common/src/icons/Right Arrow.svg'
import { ReactComponent as Person } from 'incart-fe-common/src/icons/Person.svg'
import React, { ComponentProps } from 'react'
import { Vexile } from '@haechi/flexile'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
    FInput,
    colors,
    Text1,
    Text2,
    Button,
    FormikContext,
} from 'incart-fe-common'
import Box from '../Box'

export const SingleBoxPage: React.FC<{
    children: React.ReactNode
}> = (props) => {
    return (
        <Vexile
            style={{
                backgroundColor: colors.grey1,
                minHeight: '100vh',
            }}
            fillx
            filly
            x="center"
            y="center"
        >
            <Box
                padding={12}
                gap={6}
                x="center"
                y="center"
                css={{
                    width: '100rem',
                }}
            >
                {props.children}
            </Box>
        </Vexile>
    )
}

export const SingleInputPage: React.FC<{
    scheme?: yup.StringSchema<string, yup.AnyObject, undefined, ''>
    image?: string
    defaultValue?: string
    hideInput?: boolean
    title: string
    description?: string
    placeholder: string
    inputIcon?: ComponentProps<typeof FInput>['icon']
    button?: {
        submitText?: string
    }
    onSubmit?: (value: string) => void
}> = (props) => {
    const formik = useFormik<{
        input: string
    }>({
        initialValues: {
            input: props.defaultValue || '',
        },
        async onSubmit(values) {
            props.onSubmit?.(values.input)
        },
        validateOnBlur: true,
        validateOnChange: false,
        validationSchema:
            props.scheme &&
            yup.object().shape({
                input: props.scheme,
            }),
    })

    return (
        <FormikContext.Provider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <SingleBoxPage>
                    {props.image && (
                        <img src={props.image} style={{ width: '40rem' }} />
                    )}
                    <Vexile x="center" gap={1}>
                        <Text1>{props.title}</Text1>
                        {props.description && (
                            <Text2 grey5 center>
                                {props.description}
                            </Text2>
                        )}
                    </Vexile>
                    {!props.hideInput && (
                        <Vexile fillx>
                            <FInput
                                name="input"
                                style={{
                                    width: '100%',
                                }}
                                placeholder={props.placeholder}
                                icon={
                                    props.inputIcon ||
                                    ((props) => <Person {...props} />)
                                }
                            />
                        </Vexile>
                    )}
                    <Button
                        active={!formik.isSubmitting}
                        icon={(props) => <Arrow {...props} />}
                        type="submit"
                    >
                        {props.button?.submitText || '다음'}
                    </Button>
                </SingleBoxPage>
            </form>
        </FormikContext.Provider>
    )
}
