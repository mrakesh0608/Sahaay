import { LoaderContext } from "@context/LoaderContext"
import { useContext } from "react"

export default function useLoaderContext() {

    const context = useContext(LoaderContext)

    if (!context) throw Error('useLoaderContext must be used inside an LoaderContextProvider')

    return context
}