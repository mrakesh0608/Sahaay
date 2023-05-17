import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as utils from '#src/utils';

import { usePED } from '#src/hooks/usePED';

export function useDeleteReportById() {

    const {
        isPending, error, data,
        setIsPending, setError, setData,
    } = usePED();

    async function deleteReportById({ id }) {

        setIsPending(true);
        setData(null);
        setError(null);

        if (!auth().currentUser) return;

        firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .collection('Reports')
            .doc(id)
            .delete()
            .then(async res => {
                setError(null);
                setData(1); //ok
            })
            .catch(async error => {
                console.log(err);

                setData(null);
                setError(await utils.showableErrorText(error));
            })
            .finally(() => setIsPending(false))

    }
    return { deleteReportById, data, isPending, error };
}