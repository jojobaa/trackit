// import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer"
import Header from "../components/Header";
import ContextAPI from "./ContextAPI";
import axios from "axios";
import useDays from "../components/ObjectDay"
import carregar from "../img/carregar.svg"

export default function Habits() {
    const [carregando, setCarregando] = useState(false);
    const { dia, setDia, arrayDia } = useDays();
    const [criarHabito, setCriarHabito] = useState(false);
    const [nomeHabito, setNomeHabito] = useState("");
    const { usuario } = useContext(ContextAPI);
    const [habito, setHabito] = useState([]);

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
            clicou(day);
        } else {
            desclicou(day);
        }
    }

    function dadosHabito(e) {
        e.preventDefault();
        setCarregando(true);

        const escolherDia = arrayDia.filter((day) => dia[day].isClicked === true);

        const diaId = [];
        // console.log(diaId);

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
        promise.then(() => {
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

    useEffect(() => {
        const promise2 = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                headers: { Authorization: "Bearer " + usuario.token },
            }
        );

        promise2.then((answer) => {
            setHabito(answer.data);
        });
    });

    useEffect(() => {
        const promise3 = axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/{${habito.id}}`,
            {
                headers: { Authorization: "Bearer " + usuario.token },
            }
        );

    }, []);

    function excluirHabito() {

        const infoExcluir = "Você realmente gostaria de apagar o hábito?";
        if (window.confirm(infoExcluir) === true) {

        }
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
                    {arrayDia.map((dia) => (
                        <Week
                            onClick={() => {
                                adiconaClicou(dia);
                            }}
                            disabled={carregando}
                            color={dia[dia].isClicked ? "#ffffff" : "#d4d4d4"}
                            backgroundcolor={dia[dia].isClicked ? "#d4d4d4" : "#ffffff"}
                            type="button">
                            {dia[dia].name}
                        </Week>))}
                    <Save>
                        <div
                            onClick={esconderHabito}
                            backgroundcolor="#FFFFFF"
                            color="#52B6FF"
                            marginright="17px"
                            disabled={carregando}
                            type="button">Cancelar</div>
                        <button
                            backgroundcolor="#52B6FF"
                            color="#FFFFFF"
                            disabled={carregando}>
                            {carregando ? <img src={carregar} alt="" /> : "Salvar"}
                        </button>
                    </Save>
                </HabitAdded>
            </form>
            <p>"Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"</p>
            {habito.map((habitos) => (
                <ContainerHabito>
                    <NomeHabito>
                        {habitos.name}
                        <TrashCanIconStyle>
                            <ion-icon name="trash-outline" onClick={excluirHabito}></ion-icon>
                        </TrashCanIconStyle>
                    </NomeHabito>
                    <Dias>
                        {arrayDia.map((day) => (
                            <Dia>{dia[day].name}</Dia>
                        ))}
                    </Dias>
                </ContainerHabito>
            ))}
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
display: ${(props) => props.display};
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
    color:  ${(props) => props.color};
    background-color: ${(props) => props.backgroundcolor};
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
    color:  ${(props) => props.color};
    background-color:  ${(props) => props.backgroundcolor};
    border: none;
    border-radius: 5px;
    margin-right:  ${(props) => props.marginright};
}
`
const ContainerHabito = styled.div`
  width: 93vw;
  height: 91px;
  border-radius: 5px;
  background-color: #ffffff;
  margin: 20px auto auto auto;
  padding-top: 18px;
`;
const NomeHabito = styled.div`
  width: 83vw;
  height: 45px;
  margin: auto auto 6px auto;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.97px;
  color: #666666;
  display: flex;
  justify-content: space-between;
`;
const Dias = styled.div`
  width: 83vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;
const Dia = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px #d4d4d4;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundcolor};
  color: #d4d4d4;
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.87x;
`;
const TrashCanIconStyle = styled.div``;