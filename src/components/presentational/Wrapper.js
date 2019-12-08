import styled from "styled-components"

export const Overlay = styled.div`
    display: ${props => props.display ? "block" : "none"};
    color: white;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
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
    margin-left: 25vw;
    margin-top: 22vh;
    height: 400px;
    overflow-y: scroll;
`;