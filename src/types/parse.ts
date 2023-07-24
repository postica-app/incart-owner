import z from 'zod'
// {
// "id": "b928a2e1-bde1-4563-9c5e-9feb653317fd",
// "info": "봉이워터가 맛있대요",
// "name": "봉이워터 그레이트!",
// "price": 1000,
// "options": [
//     {
//     "name": "용량",
//     "items": [
//         {
//         "info": "1인용입니다. 작습니다.",
//         "name": "기본",
//         "priceDelta": ""
//         },
//         {
//         "name": "라지",
//         "priceDelta": 1000
//         }
//     ]
//     }
// ],
// "store_id": "d14c2568-cca5-4d0b-91e7-89af116fec6e",
// "created_at": "2022-12-13T11:45:48.350Z"
// }

export const dumpedProduct = z.object({
    id: z.string().uuid(),
    info: z.string().optional(),
    name: z.string(),
    price: z.number(),
    store_id: z.string().uuid(),
    created_at: z.string().datetime(),
    options: z.array(
        z.object({
            name: z.string(),
            items: z.array(
                z.object({
                    name: z.string(),
                    info: z.string().optional(),
                    priceDelta: z
                        .union([z.string(), z.number(), z.null()])
                        .optional()
                        .transform((d) => (d ? +d || 0 : 0)),
                })
            ),
        })
    ),
})
