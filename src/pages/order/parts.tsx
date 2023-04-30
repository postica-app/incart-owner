import { useSearchParams } from 'react-router-dom'
import { Hexile, Vexile } from '@haechi/flexile'
import { useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { z } from 'zod'
import {
    ORDER_STAGE_MAP,
    FormikContext,
    FormField,
    Header2,
    FSwitch,
    FInput,
} from 'incart-fe-common'

import { OrderFilter } from './actions'

export default {
    useFilter() {
        const [_, setSearchParams] = useSearchParams()

        const initialValues = useMemo(() => {
            const params = Object.fromEntries(
                new URLSearchParams(location.search).entries()
            )
            const requiredField = {
                range_start: new Date(
                    new Date().getTime() - 70 * 24 * 60 * 60 * 1000
                )
                    .toISOString()
                    .substring(0, 10),
                range_end: new Date().toISOString().substring(0, 10),
            }

            try {
                return OrderFilter.parse({
                    ...requiredField,
                    ...params,
                })
            } catch {
                return requiredField
            }
        }, [])

        const formik = useFormik<z.infer<typeof OrderFilter>>({
            initialValues,
            validateOnChange: true,
            onSubmit: () => {},
        })

        useEffect(() => {
            setSearchParams(formik.values)
        }, [formik.values])

        const view = (
            <FormikContext.Provider value={formik}>
                <form
                    onSubmit={formik.handleSubmit}
                    style={{ width: '103rem' }}
                >
                    <Vexile gap={5}>
                        <Header2>상세 검색</Header2>
                        <Hexile gap={3}>
                            <FormField name="기간 시작" fillx>
                                <FInput name="range_start" type="date" />
                            </FormField>
                            <FormField name="끝" fillx>
                                <FInput name="range_end" type="date" />
                            </FormField>
                        </Hexile>
                        <FormField name="주문 상태">
                            <FSwitch
                                name="order_stage"
                                items={Object.entries(ORDER_STAGE_MAP).map(
                                    ([key, value]) => ({
                                        key,
                                        name: value,
                                    })
                                )}
                            />
                        </FormField>
                        <FormField name="주문자 이메일">
                            <FInput name="orderer_email" />
                        </FormField>
                        <FormField name="주문자 이름">
                            <FInput name="orderer_name" />
                        </FormField>
                        <FormField name="주문자 전화번호">
                            <FInput name="orderer_phone" />
                        </FormField>
                        <FormField name="수령자 이름">
                            <FInput name="receiver_name" />
                        </FormField>
                        <FormField name="수령자 전화번호">
                            <FInput name="receiver_phone" />
                        </FormField>
                    </Vexile>
                </form>
            </FormikContext.Provider>
        )

        return [formik.values, view] as const
    },
}
