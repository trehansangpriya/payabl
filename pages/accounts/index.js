import React, { useState } from 'react'
import { AppScreen, FAB } from '@/Components/app'
import { AccountForm, ViewAllAccounts } from '@/Components/pages/accounts'
import { Modal, Text } from '@/Components/utility'
import { privateRoute } from '@/Routes/privateRoute'

const Accounts = () => {
    // Add Account Modal
    const [addAccountModal, setAddAccountModal] = useState(false)
    return (
        <AppScreen title={'Accounts'}>
            {/* All Accounts added by the user */}
            <ViewAllAccounts />
            {/* ------------------------------------------------------------- */}
            {/* FAB to add a new account */}
            <FAB
                label={'Add Account'}
                onClick={() => setAddAccountModal(true)}
            />

            {/* Add Account Modal */}
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