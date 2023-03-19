import useNewUser from '@hooks/useNewUser'

import FormContainer from '@components/forms/FormContainer'
import NewUserForm from '@components/forms/NewUserForm'

export default function UserEditScreen() {

    const { saveInfo, error, isPending } = useNewUser();

    return (
        <FormContainer>
            <NewUserForm onSubmit={saveInfo} error={error} isPending={isPending} />
        </FormContainer>
    )
}