import styled from "styled-components";

export const Main = styled.div`
    width: 600px;
    height: 600px;
    box-shadow: 0 0 20px 20px lightblue;
    display: grid;
    /* grid-template-columns: repeat(8, 75px); */
    grid-template-rows: repeat(8, 75px);
    margin-bottom: 200px;
`

export const Rows = styled.div`
    width: 100%;
    display: flex;
`