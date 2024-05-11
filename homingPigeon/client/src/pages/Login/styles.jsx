import styled from "styled-components";
/*1da1f2 Twitt standard*/
export const Container = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  max-width: 300px;
  width: 100%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.form`
  > div {
    display: flex;
    flex-direction: column;

    & + * {
      margin-top: 0.6rem;
    }

    label {
      margin-bottom: 0.6rem;
    }

    &:last-child {
      margin-top: 1.5em;

      flex-direction: row;
      justify-content: space-between;
    }
  }

  a {
    text-decoration: none;
    color: #F13636;
    cursor: pointer;
  }
  /* This is link style
  a:hover {
    background: #F13636;
    color: white;
  } */
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #ccc;

  &:active,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #F13636;
  }
`;

export const Button = styled.button`
  background: white;
  border: 1px solid #F13636;
  padding: 0.4rem 1.3rem;
  border-radius: 20px;
  color: #F13636;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #F13636;
    color: white;
  }
`;

export const ErrorWarning = styled.div`
  border: 1px solid red;
  color: red;
  border-radius: 20px;
  padding: 0.5rem;
`;