import styled from "styled-components";
import icon from "../img/icon.png";
import trackit from "../img/trackit.png";

export default function Header() {
    return (
        <HeaderHabits>
            <img src={trackit} alt="" />
            <img src={icon} alt="" />
        </HeaderHabits>
    )
}

const HeaderHabits = styled.div`
width: 375px;
height: 70px;
display: flex;
align-items: center;
justify-content: space-between;
background-color: #126BA5;
box-shadow: 1px 2px 4px rgba(0, 0, 0, .3);
img{
    margin-left: 10px;
    margin-right: 10px;
}
`