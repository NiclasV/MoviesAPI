import styled from "styled-components";

export const Input = styled.input`
    border: 1px solid ${(props) => props.theme.background[300]};
    background-color: ${(props) => props.theme.background[100]};
    padding: 8px 10px 8px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 7px;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.text[400]};
    min-height: 40px;
    
    @media (max-width: 560px) {
        font-size: 13px;
        padding: 6px 8px 6px 10px;
        min-height: 35px;
    }

    &:hover {
        border: 1px solid ${(props) => props.theme.background[400]};

        &::placeholder {
            color: ${(props) => props.theme.text[200]};

        }
    }
    &:focus-visible, &:active, &:focus {
        color: ${(props) => props.theme.text[200]};
        outline: 1px solid  ${(props) => props.theme.primary[500]};
    }
`;