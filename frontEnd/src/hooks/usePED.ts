import { useState } from 'react'

export function usePED(initialValue = null) {

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(initialValue);

    return {
        isPending, setIsPending,
        error, setError,
        data, setData,
    }
}