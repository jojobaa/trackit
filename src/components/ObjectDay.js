import { useState } from "react"

export default function DiasDaSemana(){

    const [dia, setDia] = useState({
    DOMINGO: {
        name:"D",
        id:0,
        isClicked: false
    },
    SEGUNDA: {
        name:"S",
        id:1,
        isClicked: false
    },
    TERCA: {
        name:"T",
        id:2,
        isClicked: false
    },
    QUARTA: {
        name:"Q",
        id:3,
        isClicked: false
    },
    QUINTA: {
        name:"Q",
        id:4,
        isClicked: false
    },
    SEXTA: {
        name:"S",
        id:5,
        isClicked: false
    },
    SABADO: {
        name:"S",
        id:6,
        isClicked: false
    }

})

const arrayDia = Object.keys(dia)

return {dia, setDia, arrayDia};
}