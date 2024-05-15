import React from "react";
import { Container, Content } from "./styles";

export default function Layout({ children }) {
  const childrenArray = React.Children.toArray(children);

  return (
    <Container>
      {childrenArray.map((child, index) => (
        <Content key={index}>{child}</Content>
      ))}
    </Container>
  );
}
