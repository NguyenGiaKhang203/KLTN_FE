
import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: var(--primary-color);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    padding: 10px 0;
`

export const WrapperTextHeader = styled(Link)`
    font-size: 18px;
    color: #000;
    font-weight: bold;
    text-align: left;
    &:hover {
        font-size: 18px;
        color:#000;
    }
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 16px; 
    max-width: none; 
    flex-direction: row;
    white-space: nowrap;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 14px;
    color: #000;
    white-space: nowrap;
    transition: transform 0.3s ease-in-out;
    font-weight: bold;
    &:hover{
        color: #7D0A0A;
        transform: scaleX(1.1);
    }
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
