import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import RetrospectivaAcoes from '../../componentss/Graph/RetrospectivaAcoes';

function Favoritos() {
    const [acoesSalvas, setAcoesSalvas] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem("@matosflix");
        setAcoesSalvas(JSON.parse(minhaLista) || []);
    }, []);

    function excluirAcao(index) {
        const novaLista = acoesSalvas.filter((_, i) => i !== index);
        setAcoesSalvas(novaLista);
        localStorage.setItem("@matosflix", JSON.stringify(novaLista));
    }

    return (
        <div className='meus-filmes'>
            <h1>Minhas Bolsas de Ações</h1>
            &nbsp;
            
            {acoesSalvas.length === 0 && <h3>Ops, você não tem nenhuma ação salva :( </h3>}
    
            <ul>
                {acoesSalvas.map((acao, index) => (
                    <li key={index}>
                        <span>{acao.acao}</span>
                        <div>
                            <Link to={`/acao/${index}/0`}>Detalhes</Link> 
                            <button onClick={() => excluirAcao(index)} className="buttonExcluir">Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className='container-grafico'>
                <h2>Gráficos</h2>
                {acoesSalvas.length === 0 && <h3 style={{marginTop:'20px'}}>Insira alguma ação para ter gráficos</h3>}
               
                <div className="graficoRetro">
                    {acoesSalvas.length > 0 && <RetrospectivaAcoes acoesSalvas={acoesSalvas.map(acao => acao.acao)} />}
                </div>
            </div>
        </div>
    );
}

export default Favoritos;