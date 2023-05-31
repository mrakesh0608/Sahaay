import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as utils from '#src/utils';

import { usePED } from '#src/hooks/usePED';

export function useDeleteReportById() {

    const {
        isPending, error,
        setIsPending, setError,
    } = usePED();

    async function deleteReportById({ id }, cb) {

        setIsPending(true);
        setError(null);

        if (!auth().currentUser) return;

        firestore()
            .collection('Reports')
            .doc(id)
            .delete()
            .then(async res => {
                setError(null);
                cb(null, { "status": 200 }); //ok
            })
            .catch(async error => {
                console.log(error);

                cb({ "status": 500 }, null);
                setError(await utils.showableErrorText(error));
            })
            .finally(() => setIsPending(false))

    }
    return { deleteReportById, isPending, error };
}