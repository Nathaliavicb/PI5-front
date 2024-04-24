import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import acoesData from '../../dados/acoes.json';

function Home() {
    const [acoes, setAcoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAcoes(acoesData);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando ações...</h2>
            </div>
        );
    }

    return (
        <div className='container-acoes'>
            <div className='lista-acoes'>
                {acoes.map((acao, index) => (
                    <div className="linha-acoes" key={index}>
                        <div className="acao-item">
                            <h3>{acao.empresa}</h3>
                            <p>{acao.descricao}</p>
                            <Link to={`/acao/${index}`} className="botao-acompanhar">Acompanhar</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;