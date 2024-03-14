import React from "react"
import { Container, Content } from "./styles"
//props: objeto com várias propriedades.
export default function Layout({ children }) {
    return(
        <Container>
            <Content>{children}</Content>
        </Container>
    )
}