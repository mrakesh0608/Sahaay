import * as myfirebase from '@myfirebase';

export default function useInitUser() {
    async function initUser({ user, Theme, dispatch }) {
        if (!user) return;

        //save current theme of user in cloud if not exits
        await myfirebase.initNewUser({ Theme });

        await myfirebase.getUserFields(["Theme"], (err, data) => {
            // console.log(err, data);
            if (err || !data) return;
            if (data.Theme) dispatch({ type: 'SET_INFO', payload: data })
        })

        if (!user.displayName) dispatch({ type: 'SET_IS_NEW_USER', payload: true })
        else dispatch({ type: 'SET_IS_NEW_USER', payload: false })
    }
    return { initUser }
}