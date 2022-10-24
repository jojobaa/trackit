import styled from "styled-components";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <FooterHabits>
            <Link to="/habits"><h3>Hábitos</h3></Link>
            <Containercircular>
                <CircularProgressbarWithChildren
                    value={75}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        pathColor: "#fff",
                        trailColor: "transparent"
                    })}>
                    <Link to="/today"><h3>Hoje</h3></Link>
                </CircularProgressbarWithChildren>
            </Containercircular>
            <Link to="/historic"><h3>Histórico</h3></Link>
        </FooterHabits>
    )
}

const FooterHabits = styled.div`
width: 375px;
height: 70px;
display: flex;
align-items: center;
justify-content: space-around;
background-color: #FFFFFF;
position: fixed;
bottom: 0;
left: 0;
h3{
    font-size: 18px;
    color: #52B6FF;
    font-family: 'Lexend Deca', sans-serif;
}
`
const Containercircular = styled.div`
width: 91px;
height: 91px;
position: fixed;
bottom: 16px;
left: auto;
h3{
    color:#FFFFFF;
    margin-bottom: 11px;
}
`