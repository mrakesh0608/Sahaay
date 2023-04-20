import React from 'react';

import { useNewUser } from '#src/hooks'

import FormContainer from '#src/forms/FormContainer'
import NewUserForm from '#src/forms/NewUserForm'

export default function UserEditScreen() {

    const { saveInfo, error, isPending } = useNewUser();

    return (
        <FormContainer>
            <NewUserForm onSubmit={saveInfo} error={error} isPending={isPending} />
        </FormContainer>
    )
}