import { usePED } from "#src/hooks/usePED";

function MethodLoad({ method, payload }) {

    if (method === 'POST' || method === "PATCH" || method === 'PUT') {
        return {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };
    }
    else if (method === "GET" || method === "DELETE") return { method }
    else return { method: 'GET' }
}

export function useFetch() {

    const {
        isPending, error, data,
        setIsPending, setError, setData,
    } = usePED();

    async function fetchData({
        path,
        method,
        payload
    }: {
        path: string,
        method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH',
        payload?: object
    }) {

        setIsPending(true);
        setData(null);
        setError(null);

        try {
            const options = await MethodLoad({ method, payload })
            // console.log(path, options);

            const res = await fetch(path, options)

            if (!res) throw Error("Something Went Wrong");

            const json = await res.json();

            // console.log(res);
            console.log(JSON.stringify(json, null, 2));

            if (json.data) {
                setError(null);
                setData(json.data);
            }
            else throw Error(json.error?.message);
        }
        catch (err) {
            console.log(err);

            setData(null);
            setError(err.message);
        }
        finally { setIsPending(false); }
    }

    const GET = async ({
        path, cb
    }: {
        path: string,
        cb: any
    }) => {
        // console.log(path, method, payload);
        setIsPending(true);
        // setData(null);
        setError(null);

        try {
            const response = await fetch(path);
            const json = await response.json();
            // console.log(json);

            if (!response.ok) {
                setIsPending(false)
                setError(json.error);
                throw Error('Error Occurred')
            }
            else if (response.ok) {
                setIsPending(false);
                setError(null);
                setData(json);
                cb({ data: json.data })
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsPending(false);
            cb({ error: error.message });
        }
    }

    return { fetchData, GET, data, isPending, error, setIsPending };
}