import styled from "styled-components";

const SmallUserBadge = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;
    width: 2rem;
    background-color: ${props => props.color};
    border-radius: 50%;
    color: ${props => props.theme.text};
    font-weight: bold;
    font-size: .8rem;
`;

export default SmallUserBadge;