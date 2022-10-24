import styled from "styled-components";
import trackit from "../img/trackit.png";
import { useContext } from "react"
import ContextAPI from "../pages/ContextAPI"

export default function Header() {
    const { usuario } = useContext(ContextAPI)
    return (
        <HeaderHabits>
            <Logo>
                <img src={trackit} alt="" />
            </Logo>
            <Icon>
                <img src={usuario.image} alt="" data-identifier="avatar" />
            </Icon>
        </HeaderHabits>
    )
}

const HeaderHabits = styled.div`
margin: 0 auto;
width: 100%;
height: 70px;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #126BA5;
box-shadow: 1px 2px 4px rgba(0, 0, 0, .3);
position: fixed;
top: 0;
left: 0;
`
const Logo = styled.div`
img{
    margin-left: 10px;
    margin-right: 10px;
}
`
const Icon = styled.div`
img{
    width:51px;
    height: 51px;
    border-radius: 98.5px;
    object-fit: cover;
    margin-right: 18px;
}
`