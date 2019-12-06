import styled from "styled-components"

export const Overlay = styled.div`
    display: ${props => props.display ? "block" : "none"};
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    opacity: 82%;
    padding: 200px 400px;
`;

export const SubContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-left: 50px;
    border-left: 0.5px solid #FFFFFF;
    padding-left: 50px;
    max-height: 300px;
    width: 600px;
`;

export const Content = styled.div`
    height: 400px;
    overflow-y: scroll;
`;