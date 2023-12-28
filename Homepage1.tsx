import { Container, Theme, ThemeProvider } from "@mui/material"
import React from "react"

interface Props{
    newTheme: Theme
    }
export default function Homepage({newTheme}: Props) {
    return (
        <>
            <h1>Welcome! Our Catalog Awaits!</h1>
            <p>This site has the best Luxury gifts suitable for the most discerning recipients.</p>
        </>
    )
}