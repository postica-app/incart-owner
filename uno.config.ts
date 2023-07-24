import { defineConfig, presetUno } from 'unocss'

const decimal = '\\d*\\.?\\d+'

export default defineConfig({
    presets: [
        presetUno(),
        {
            name: 'font',
            rules: [
                [
                    new RegExp(`^size-(${decimal})$`),
                    (m) => ({
                        'font-size': `${m[1]}rem`,
                    }),
                ],

                [
                    new RegExp(`^weight-(${decimal})$`),
                    (m) => ({
                        'font-weight': m[1] + '00',
                    }),
                ],
            ],
        },
        {
            name: 'grid',
            rules: [
                [
                    // /^gap-(\d+)$/,
                    new RegExp(`^gap-(${decimal})$`),
                    (m) => ({
                        gap: m[1] + 'rem',
                    }),
                ],
                // grid-col-6-min-20
                [
                    // /^grid-col-(\d+)-min-(\d+)$/,
                    new RegExp(`^grid-col-(${decimal})-min-(${decimal})$`),
                    (m) => ({
                        display: 'grid',
                        'grid-template-columns': `repeat(${m[1]}, minmax(${m[2]}rem, 1fr))`,
                    }),
                ],
                // grid-min-20-max-30
                [
                    // /^grid-min-(\d+)$/,
                    new RegExp(`^grid-min-(${decimal})$`),
                    (m) => ({
                        display: 'grid',
                        'grid-template-columns': `repeat(auto-fit, minmax(${m[1]}rem, 1fr))`,
                    }),
                ],
            ],
        },
        {
            name: 'size',
            rules: [
                [
                    // /^max-w-(\d+)$/,
                    new RegExp(`^max-w-(${decimal})$`),
                    (m) => ({
                        'max-width': m[1] + 'rem',
                    }),
                ],
                [
                    // /^p-(\d+)$/,
                    new RegExp(`^p-(${decimal})$`),
                    (m) => ({
                        padding: m[1] + 'rem',
                    }),
                ],
                [
                    // /^p-(\d+)-(\d+)$/,
                    new RegExp(`^p-(${decimal})-(${decimal})$`),
                    (m) => ({
                        padding: `${m[1]}rem ${m[2]}rem`,
                    }),
                ],
                [
                    // /^pb-(\d+)$/,
                    new RegExp(`^pb-(${decimal})$`),
                    (m) => ({
                        'padding-bottom': m[1] + 'rem',
                    }),
                ],
                [
                    // /^pt-(\d+)$/,
                    new RegExp(`^pt-(${decimal})$`),
                    (m) => ({
                        'padding-top': m[1] + 'rem',
                    }),
                ],
                [
                    // /^pr-(\d+)$/,
                    new RegExp(`^pr-(${decimal})$`),
                    (m) => ({
                        'padding-right': m[1] + 'rem',
                    }),
                ],
                [
                    // /^pl-(\d+)$/,
                    new RegExp(`^pl-(${decimal})$`),
                    (m) => ({
                        'padding-left': m[1] + 'rem',
                    }),
                ],
                [
                    // /^px-(\d+)$/,
                    new RegExp(`^px-(${decimal})$`),
                    (m) => ({
                        'padding-left': m[1] + 'rem',
                        'padding-right': m[1] + 'rem',
                    }),
                ],
                [
                    // /^py-(\d+)$/,
                    new RegExp(`^py-(${decimal})$`),
                    (m) => ({
                        'padding-top': m[1] + 'rem',
                        'padding-bottom': m[1] + 'rem',
                    }),
                ],
                [
                    // /^w-(\d+)$/,
                    new RegExp(`^w-(${decimal})$`),
                    (m) => ({
                        width: m[1] + 'rem',
                    }),
                ],
                [
                    // /^h-(\d+)$/,
                    new RegExp(`^h-(${decimal})$`),
                    (m) => ({
                        height: m[1] + 'rem',
                    }),
                ],
                [
                    // margin-bottom
                    // /^mb-(\d+)$/,
                    new RegExp(`^mb-(${decimal})$`),
                    ([_, gap]) => ({
                        'margin-bottom': gap + 'rem',
                    }),
                ],
                [
                    new RegExp(`^mt-(${decimal})$`),
                    ([_, gap]) => ({
                        'margin-top': gap + 'rem',
                    }),
                ],
                [
                    new RegExp(`^mr-(${decimal})$`),
                    ([_, gap]) => ({
                        'margin-right': gap + 'rem',
                    }),
                ],
                [
                    new RegExp(`^ml-(${decimal})$`),
                    ([_, gap]) => ({
                        'margin-left': gap + 'rem',
                    }),
                ],
            ],
        },
        {
            name: 'round',
            rules: [
                [
                    // /^round-(\d+)$/,
                    new RegExp(`^round-(${decimal})$`),
                    (m) => ({
                        'border-radius': m[1] + 'rem',
                    }),
                ],
            ],
        },
        {
            name: 'inset',
            rules: [
                [
                    // /^left-(\d+)$/,
                    new RegExp(`^left-(${decimal})$`),
                    (m) => ({
                        left: m[1] + 'rem',
                    }),
                ],
                [
                    new RegExp(`^right-(${decimal})$`),
                    (m) => ({
                        right: m[1] + 'rem',
                    }),
                ],
                [
                    new RegExp(`^top-(${decimal})$`),
                    (m) => ({
                        top: m[1] + 'rem',
                    }),
                ],
                [
                    new RegExp(`^bottom-(${decimal})$`),
                    (m) => ({
                        bottom: m[1] + 'rem',
                    }),
                ],
            ],
        },
    ],
    theme: {
        colors: {
            GRAY0: '#F8F9FA',
            GRAY1: '#F1F3F5',
            GRAY2: '#E9ECEF',
            GRAY3: '#DEE2E6',
            GRAY4: '#CED4DA',
            GRAY5: '#ADB5BD',
            GRAY6: '#868E96',
            GRAY7: '#495057',
            GRAY8: '#343A40',
            GRAY9: '#212529',
        },
    },
    rules: [
        [
            'round',
            {
                'border-radius': '3rem',
            },
        ],
        [
            'card-shadow',
            {
                'box-shadow': '3px 3px 5px rgba(73, 80, 87, 0.1)',
            },
        ],
    ],
    shortcuts: {
        card: 'bg-white round card-shadow',
        pointer: 'cursor-pointer',
    },
})
