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
            arrayDia.forEach((day) => {
                dia[day].isClicked = false
            })
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

    function excluirHabito(idHabito) {

        const confirmar = "Você realmente gostaria de apagar o hábito?";
        if (window.confirm(confirmar) === true) {
            const promise3 = axios.delete(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabito}`,
                {
                    headers: { Authorization: "Bearer " + usuario.token },
                }
            );

            const promise4 = axios.get(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                {
                    headers: { Authorization: "Bearer " + usuario.token },
                }
            );
            promise4.then((answer) => {
                setHabito(answer.data);
            });
        }
    }

    return (
        <ContainerHabitoPage>
            <Background>
                <Header />
                <AddHabits>
                    <h2>Meus hábitos</h2>
                    <button data-identifier="create-habit-btn" onClick={() => setCriarHabito(!criarHabito)}>+</button>
                </AddHabits>
                <form onSubmit={dadosHabito}>
                    <HabitAdded display={criarHabito ? "block" : "none"}>
                        <Input
                            data-identifier="input-habit-name"
                            type={"text"}
                            placeholder={"nome do hábito"}
                            disabled={carregando}
                            value={nomeHabito}
                            onChange={(e) => setNomeHabito(e.target.value)}
                        ></Input>
                        <ContainerWeek>
                            {arrayDia.map((day) => (
                                <Week
                                    data-identifier="week-day-btn"
                                    onClick={() => {
                                        adiconaClicou(day);
                                    }}
                                    disabled={carregando}
                                    color={dia[day].isClicked ? "#ffffff" : "#d4d4d4"}
                                    backgroundcolor={dia[day].isClicked ? "#d4d4d4" : "#ffffff"}
                                    type="button">
                                    {dia[day].name}
                                </Week>))}
                        </ContainerWeek>
                        <Save>
                            <Cancelar
                                data-identifier="cancel-habit-create-btn"
                                onClick={esconderHabito}
                                backgroundcolor="#FFFFFF"
                                color="#52B6FF"
                                marginright="17px"
                                disabled={carregando}
                                type="button">Cancelar</Cancelar>
                            <Salvar
                                data-identifier="save-habit-create-btn"
                                backgroundcolor="#52B6FF"
                                color="#FFFFFF"
                                disabled={carregando}>
                                {carregando ? <img src={carregar} alt="" /> : "Salvar"}
                            </Salvar>
                        </Save>
                    </HabitAdded>
                </form>
                <p data-identifier="no-habit-message">{habito.length === 0 ? "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!" :
                    ""}</p>
                {habito.map((habitos) => (
                    <ContainerHabito>
                        <NomeHabito data-identifier="habit-name">
                            {habitos.name}
                            <TrashCanIconStyle data-identifier="delete-habit-btn">
                                <ion-icon name="trash-outline" onClick={() => excluirHabito(habitos.id)}></ion-icon>
                            </TrashCanIconStyle>
                        </NomeHabito>
                        <Dias>
                            {arrayDia.map((day) => (
                                <Dia backgroundcolor={habitos.days.includes(dia[day].id) ? "#CFCFCF" : "#FFFFFF"}
                                    color={habitos.days.includes(dia[day].id) ? "#FFFFFF" : "#CFCFCF"}>{dia[day].name}
                                </Dia>
                            ))}
                        </Dias>
                    </ContainerHabito>
                ))}
                <Footer />
            </Background>
        </ContainerHabitoPage>
    )
}

const ContainerHabitoPage = styled.div`
height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
margin-top: 60px;
margin-bottom: 20px;
p{
    margin-top: 20px;
    margin-right: 10px;
    margin-left: 10px;
    font-size: 18px;
    color: #666666;
    font-family: 'Lexend Deca', sans-serif;
}
`
const Background = styled.div`
/* height: 100vh;
margin: 0 auto;
background-color: #F2F2F2;
margin-top: 90px; */
`
const AddHabits = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 30px;
margin-right: 10px;
margin-left: 10px;
padding-top: 40px;
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
  width: 93vw;
  height: 180px;
  border-radius: 5px;
  background-color: #ffffff;
  margin: 20px auto auto auto;
  padding-top: 18px;
  display: ${(props) => props.display};
  input {
    width: 83vw;
  }
input::placeholder{
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    color: #D4D4D4;
    font-weight: normal;
}
`
const Input = styled.input`
width: 303px;
height: 45px; 
border: none;
border: 1px solid #D4D4D4;
border-radius: 5px;
margin-left:13px;
`
const ContainerWeek = styled.div`
  width: 83vw;
  margin: auto;
  display: flex;
  justify-content: space-between;
`

const Week = styled.div`
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
margin-top:10px;

`
const Save = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
padding-left: 120px;
`
const Cancelar = styled.div`
font-family: 'Lexend Deca', sans-serif;
font-size: 15px;
color: #52B6FF;
padding-right:15px;
`
const Salvar = styled.button`
width: 84px;
height: 35px;
font-family: 'Lexend Deca', sans-serif;
font-size: 15px;
color:${(props) => props.color};
background-color:${(props) => props.backgroundcolor};
border: none;
border-radius: 5px;
margin-right:${(props) => props.marginright};
img{
    height: 35px;
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
  color: ${(props) => props.color};
  font-family: "Lexend Deca";
  font-weight: 400;
  font-size: 19.98px;
  line-height: 24.87x;
`;
const TrashCanIconStyle = styled.div``;