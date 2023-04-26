import { useState } from 'react'

export function usePED() {

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    return {
        isPending, setIsPending,
        error, setError,
        data, setData,
    }
}