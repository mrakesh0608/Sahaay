import * as firebase from '#src/firebase';

export function useInitUser() {
    async function initUser({ user, theme, dispatch }) {

        if (!user) return;

        //init initial fields of user in cloud if not exits
        await firebase.initNewUser({ theme });

        await firebase.getUserFields([], (err: any, data: any) => {
            console.log(err, data);
            if (err || !data) return;
            if (data.theme) dispatch({ type: 'SET_INFO', payload: data })
        })

        if (!user.displayName) dispatch({ type: 'SET_IS_NEW_USER', payload: true })
        else dispatch({ type: 'SET_IS_NEW_USER', payload: false })
    }
    return { initUser };
} 