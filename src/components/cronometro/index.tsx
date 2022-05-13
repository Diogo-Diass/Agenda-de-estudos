import React, { useEffect, useState } from "react";
import Botao from "../botao";
import { Relogio } from "./relogio";
import  Style  from "./Cronometro.module.scss";
import { tempoParaSegundos } from "../../common/utils/tempo";
import { ITarefas } from "../../types/tarefas";

interface Props {
    selecionado: ITarefas | undefined
    finalizarTarefa: () => void
}


export function Cronometro({selecionado, finalizarTarefa}: Props){
console.log("conversão para segundos ", tempoParaSegundos('01:01:01'))

    const [tempo, setTempo] = useState<number>()
    useEffect(() =>{
        if(selecionado?.tempo)
        setTempo(tempoParaSegundos(String (selecionado?.tempo)))
    }, [selecionado])

    
    function regressiva(contador: number = 0){
        setTimeout (() =>{
                if(contador > 0){
                    setTempo(contador - 1)
                    return regressiva(contador - 1)
                }
                finalizarTarefa()
        }, 1000)
    }
    
    
    return(
        <div className={Style.cronometro}>
            <p className={Style.titulo}>Escolha um card e inicie o cronomêtro</p>
                <div className={Style.relogioWrapper}>
                    <Relogio
                    tempo = {tempo}
                    />
                    </div>
                    <Botao onClick = {() => regressiva(tempo)}>
                        Iniciar!
                    </Botao>
               

        </div>
    )
}