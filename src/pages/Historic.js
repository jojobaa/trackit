// import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer"
import Header from "../components/Header";

export default function Historic() {
    return (
        <ContainerHistoric>
            <Header />
            <h1>Histórico</h1>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Footer />
        </ContainerHistoric>
    )
}

const ContainerHistoric = styled.div`
height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
margin-top:100px;
h1{
    margin-top: 30px;
    margin-left: 10px;
    margin-right: 10px;
    color: #126BA5;
    font-size: 22px;
    font-family: 'Lexend Deca', sans-serif;
}
p{
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    color: #666666;
    font-size: 17px;
    font-family: 'Lexend Deca', sans-serif;
}
`

