import { ThemeContext } from "@context/ThemeContext"
import { useContext } from "react"

export default function useThemeContext() {

    const context = useContext(ThemeContext)

    if (!context) throw Error('useThemeContext must be used inside an ThemeContextProvider')

    return context
}