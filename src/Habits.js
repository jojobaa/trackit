// import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer"
import Header from "./Header";

export default function Habits() {
    return (
        <Background>
            <Header />
            <ContainerH>
                <AddHabits>
                    <h2>Meus hábitos</h2>
                    <button>+</button>
                </AddHabits>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                <Footer />
            </ContainerH>
        </Background>
    )
}
const Background = styled.div`
width: 375px;
margin: 0 auto;
background-color: #F2F2F2;
`
const ContainerH = styled.div`
margin-left: 5px;
margin-right:5px;
background-color: #F2F2F2;
p{
    margin-top: 20px;
    font-size: 18px;
    color: #666666;
    font-family: 'Lexend Deca', sans-serif;
}
`
const AddHabits = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 20px;
h2{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 20px;
    color: #126BA5;
    font-weight: normal;
}
button{
    width: 40px;
    height: 35px;
    border-radius: 5px;
    background-color: #52B6FF;
    border: none;
    color: #FFFFFF;
    font-size: 25px;
}
`
