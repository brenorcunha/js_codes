import styled from "styled-components"

export const Container = styled.div`
    display: flex
    flex-direction: column
    padding: 1rem
    border: 1px solid #CCCCCC

    > textarea {
        resize: none
        margin-bottom: 1rem
        color: #F13636
        border: 1px solid #F13636
        border-radius: 10px
    }
    > div {
        display: flex
        justify-content; flex-end

        > button{
            background: white
            border: 1px solid #F13636
            padding: 0.4rem1 rem
            border-radius: 20px
            color: #F13636
            font-weight: 600
            cursor: pointer

            &: hover{
                background: #F13636
                color: white
            }
        }
    }
`
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