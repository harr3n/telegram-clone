import styled from "styled-components";

const UserBadge = styled.div`
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    height: ${props => props.size === "small" ? "2rem" : "4rem"};
    width: ${props => props.size === "small" ? "2rem" : "4rem"};
    background-color: ${props => props.color};
    border-radius: 50%;
    color: ${props => props.theme.text};
    font-weight: bold;
    font-size: ${props => props.size === "small" ? "0.8rem" : "1.3rem"};
`;

export default UserBadge;