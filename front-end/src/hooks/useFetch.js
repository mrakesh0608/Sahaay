import usePED from "./usePED";

export default function useFetch() {

    const {
        isPending, error, data,
        setIsPending, setError, setData,
    } = usePED();

    const fetchData = async ({ path, method, body }) => {

        setIsPending(true);
        setData(null);
        setError(null);

        try {
            const res = await fetch(path, {
                method,
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if (!res) throw Error("Something Went Wrong");

            const json = await res.json();

            // console.log(res);
            // console.log(json);

            if (json.data) {
                setError(null);
                setData(json.data);
            }
            else throw Error(json.error.message);
        }
        catch (err) {
            console.log(err);

            setData(null);
            setError(err.message);
        }
        finally { setIsPending(false); }
    }
    return { fetchData, data, isPending, error };
}