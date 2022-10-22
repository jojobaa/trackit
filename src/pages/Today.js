// import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer"
import Header from "../components/Header";

export default function Today() {
    return (
        <ContainerToday>
            <Header />
            <Title>
                <h1>Segunda, 17/05</h1>
                <p>Nenhum hábito concluído ainda</p>
            </Title>
            <CardHabit>
                <InfoHabitToday>
                    <h2>Ler livro</h2>
                    <p>Sequência atual:</p>
                    <p>Seu recorde:</p>
                </InfoHabitToday>
                <CheckHabitToday>
                    <ion-icon name="checkmark-outline"></ion-icon>
                </CheckHabitToday>
            </CardHabit>
            <Footer />
        </ContainerToday>
    )
}

const ContainerToday = styled.div`
height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
`
const Title = styled.div`
margin-left: 10px;
margin-top: 15px;
h1{
    color: #126BA5;
    font-size: 22px;
    font-family: 'Lexend Deca', sans-serif;
}
p{
    margin-top: 5px;
    color: #BABABA;
    font-size: 17px;
    font-family: 'Lexend Deca', sans-serif;
}
`
const CardHabit = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
width: 340px;
height: 94px;
background-color: #FFFFFF;
margin-top: 10px;
margin-left: 15px;
`
const InfoHabitToday = styled.div`
background-color: #FFFFFF;
h2{
    color: #666666;
    font-size: 20px;
    font-family: 'Lexend Deca', sans-serif;
    margin-bottom: 10px;
}
p{
    color: #666666;
    font-size: 15px;
    font-family: 'Lexend Deca', sans-serif;
}
`
const CheckHabitToday = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 70px;
height: 70px;
border-radius: 5px;
color: #FFFFFF;
font-size: 50px;
background-color:#BABABA;;
`