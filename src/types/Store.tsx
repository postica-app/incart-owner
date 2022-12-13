export interface Store {
    name: string
    payment_receive_account: {
        bankAccount: {
            bank: string
            accountNumber: string
        }
        other: {
            key: string
            type: 'tossID' | 'KakaopayQR'
        }[]
    }
}
