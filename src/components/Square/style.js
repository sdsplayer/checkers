import styled from "styled-components";

export const Main = styled.div`
    border-width: 2px;
    border-style: ${({code})=>code===4?'solid':'none'};
    border-color: ${({code})=>code===4?'red':'gray'};
    background-color: ${({color})=>color?'#2f2f2f':'white'};
    width: 75px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
`