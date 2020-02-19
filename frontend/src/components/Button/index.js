import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    height: 40px;
    padding: 0 1rem;
    background-color: #37aee2;
    color: ${props => props.theme.text};
    border-radius: 25px;
    font-weight: bold;
    font-size: 1rem;
    transition: all .5s .25s ease-out;
`;

const Button = ({children, ...props}) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
