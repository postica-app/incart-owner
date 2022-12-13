import { ProductOptionType, Text1, useField } from 'incart-fe-common'
import { Vexile } from '@haechi/flexile'

import { ReactComponent as Config } from 'incart-fe-common/src/icons/Config.svg'
import { ReactComponent as X } from 'incart-fe-common/src/icons/X.svg'

import { useModal } from '@/hooks/useModal'
import { ICON_SIZE_24 } from '@/constants'
import { OptionEditModal } from './parts'
import styles from './styles'

export const OptionListEditerView: React.FC<{
    options: ProductOptionType[]
    onAddNewOptionClicked?: () => void
    onRemoveOptionClicked?: (option: ProductOptionType) => void
    onEditOptionClicked?: (option: ProductOptionType) => void
}> = (props) => {
    return (
        <Vexile gap={3}>
            {props.options.map((option) => (
                <styles.Item
                    y="center"
                    key={option.name}
                    gap={3}
                    onClick={() => props.onEditOptionClicked?.(option)}
                >
                    <Text1 css={{ flex: 1 }}>{option.name}</Text1>
                    {option.priceDelta && (
                        <Text1>{option.priceDelta?.toLocaleString()}원</Text1>
                    )}
                    <Config style={ICON_SIZE_24} />
                    <X
                        style={ICON_SIZE_24}
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            props.onRemoveOptionClicked?.(option)
                        }}
                    />
                </styles.Item>
            ))}
            <styles.Item
                x="center"
                onClick={() => props.onAddNewOptionClicked?.()}
            >
                <Text1 grey5>새 옵션 만들기 +</Text1>
            </styles.Item>
        </Vexile>
    )
}

export const OptionListEditer: React.FC<{
    options: ProductOptionType[]
    onChange: (newOptions: ProductOptionType[]) => void
}> = (props) => {
    const showModal = useModal()

    return (
        <OptionListEditerView
            options={props.options}
            onRemoveOptionClicked={(option) => {
                const editIndex = props.options.indexOf(option)
                props.onChange([
                    ...props.options.slice(0, editIndex),
                    ...props.options.slice(editIndex + 1),
                ])
            }}
            onEditOptionClicked={(option) => {
                const closeModal = showModal(
                    <OptionEditModal
                        closeModal={() => closeModal()}
                        options={props.options}
                        editExistingOption={option}
                        onSubmit={(newOption) => {
                            const editIndex = props.options.indexOf(option)
                            props.onChange([
                                ...props.options.slice(0, editIndex),
                                newOption,
                                ...props.options.slice(editIndex + 1),
                            ])
                        }}
                    />
                )
            }}
            onAddNewOptionClicked={() => {
                const closeModal = showModal(
                    <OptionEditModal
                        closeModal={() => closeModal()}
                        options={props.options}
                        onSubmit={(newOption) =>
                            props.onChange([...props.options, newOption])
                        }
                    />
                )
            }}
        />
    )
}

export const FOptionListEditer: React.FC<{
    name: string
}> = (props) => {
    const [field, meta, helper] = useField(props.name)

    return (
        <OptionListEditer
            options={field.value}
            onChange={(newOptions) => helper.setValue(newOptions)}
        />
    )
}
