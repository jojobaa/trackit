import styled from "styled-components";

export default function Footer() {
    return (
        <FooterHabits>
            <p>Hábitos</p>
            <p>Histórico</p>
        </FooterHabits>
    )
}

const FooterHabits = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background-color: #FFFFFF;
position: fixed;
bottom: 0;
left: 0;
`