// import { Link } from "react-router-dom";
import { useContext, useState, useDays } from "react";
import styled from "styled-components";
import Footer from "../components/Footer"
import Header from "../components/Header";
import ContextAPI from "./ContextAPI";
import axios from "axios";

export default function Habits() {
    const [carregando, setCarregando] = useState(false);
    const { dia, setDia, arrayDia } = useDays();
    const [criarHabito, setCriarHabito] = useState(false);
    const [nomeHabito, setNomeHabito] = useState("");
    const { usuario } = useContext(ContextAPI);

    function clicou(day) {
        dia[day].isClicked = true;
        setDia({ ...dia });
    }

    function desclicou(day) {
        dia[day].isClicked = false;
        setDia({ ...dia });
    }

    function adiconaClicou(day) {
        if (dia[day].isClicked === false) {
            adiciona(day);
        } else {
            remove(day);
        }
    }

    function dadosHabito(e) {
        e.preventDefault();
        setCarregando(true);

        const escolherDia = arrayDia.filter((day) => dia[day].isClicked === true);

        const diaId = [];
        console.log(diaId);

        for (let i = 0; i < escolherDia.length; i++) {
            diaId.push(dia[escolherDia[i]].id);
        }

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",

            {
                name: nomeHabito,
                days: diaId,
            },
            {
                headers: { Authorization: "Bearer " + usuario.token }
            }
        );
        promise.then((answer, dia) => {
            setCarregando(false);
            setCriarHabito(false);
            setNomeHabito("")

        });

        promise.catch((error) => {
            alert(error.response.data.message);
            setCarregando(false);
        });
    }

    function esconderHabito() {
        setCriarHabito(false);
    }

    return (
        <Background>
            <Header />
            <AddHabits>
                <h2>Meus hábitos</h2>
                <button onClick={() => setCriarHabito(!setCriarHabito)}>+</button>
            </AddHabits>
            <form onSubmit={dadosHabito}>
                <HabitAdded display={criarHabito ? "block" : "none"}>
                    <input type={"text"}
                        placeholder={"nome do hábito"}
                        disabled={carregando}
                        value={nomeHabito}
                        onChange={(e) => setNomeHabito(e.target.value)}
                    ></input>
                    {arrayDia.map((day) => (
                        <Week
                            onClick={() => {
                                clicou(dia);
                            }}
                            disabled={carregando}
                            color={dia[day].isClicked ? "#ffffff" : "#d4d4d4"}
                            backgroundcolor={dia[day].isClicked ? "#d4d4d4" : "#ffffff"}
                            type="button">
                            {dia[day].name}
                        </Week>))}
                    <Save>
                        <div>Cancelar</div>
                        <button>Salvar</button>
                    </Save>
                </HabitAdded>
            </form>
            <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            <Footer />
        </Background>
    )
}
const Background = styled.div`
height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
margin-top: 90px;
p{
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 18px;
    color: #666666;
    font-family: 'Lexend Deca', sans-serif;
}
`
const AddHabits = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 30px;
margin-right: 10px;
margin-left: 10px;
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
const HabitAdded = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin-top: 15px;
margin-left: 12px;
width: 340px;
height: 180px;
background-color: #FFFFFF;
/* display: none; */
input{
   width: 303px;
   height: 45px;
   border: none;
   border: 1px solid #D4D4D4;
   border-radius: 5px;
}
input::placeholder{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #D4D4D4;
    font-weight: normal;
}
`
const Week = styled.div`
display: flex;
margin-top: 10px;
div{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: 1px solid #D4D4D4;
    font-family: 'Lexend Deca', sans-serif;
    color: #D4D4D4;
    font-size: 18px;
    border-radius: 5px;
    margin-right: 5px;
}
`
const Save = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
padding-left: 120px;
div{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 15px;
    color: #52B6FF;
    padding-right:15px;
}
button{
    width: 84px;
    height: 35px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 15px;
    color: #FFFFFF;
    background-color: #52B6FF;
    border: none;
    border-radius: 5px;
}
`