import React, { useState } from 'react'
import { AppScreen, FAB } from '@/Components/app'
import { AccountForm } from '@/Components/pages/accounts'
import { Modal, Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'

const Accounts = () => {
    // Add Account Modal
    const [addAccountModal, setAddAccountModal] = useState(false)
    return (
        <AppScreen title={'Accounts'}>
            <Text tag='h4'>
                Accounts
            </Text>
            <FAB
                label={'Add Account'}
                onClick={() => setAddAccountModal(true)}
            />
            <Modal
                isOpen={addAccountModal}
                onClose={() => setAddAccountModal(false)}
                title={'Add Account'}
            >
                <AccountForm
                    task={'add'}
                    afterSubmitActions={() => setAddAccountModal(false)}
                />
            </Modal>
        </AppScreen>
    )
}

export default privateRoute(Accounts)