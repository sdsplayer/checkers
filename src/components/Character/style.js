import styled from "styled-components";

export const Main = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${({code})=>code===1?'black':'white'};
    display: ${({code})=>code===0?'none':'flex'};
    border-radius: 50%;
    justify-content: center;
    border: 2px solid gray;
    align-items: center;
    div{
        border-radius: 50%;
        width: 40px;
        height: 40px;
        border: 2px solid gray;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: gray;
        }
    }
`