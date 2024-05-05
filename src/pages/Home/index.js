import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import acoesData from '../../dados/acoes.json';
import intro from '../../assets/intro.jpg';

function Home() {
    const [acoes, setAcoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setAcoes(acoesData);
        setLoading(false);
    }, []);

    const handleSaibaMaisClick = () => {
        // Redirecionamento para a div lista-acoes
        const listaAcoes = document.querySelector('.lista-acoes');
        listaAcoes.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando ações...</h2>
            </div>
        );
    }

    return (
        <div className='container-acoes'>
            <div className='intro'>
                <div className='intro-container'>
                    <h2>Saiba como investir nas melhores ações</h2>
                    <span>Nosso algoritmo fornece as melhores ações para investir a longo e médio prazo, com apenas um clique!</span>
                    <button onClick={handleSaibaMaisClick}>Saiba mais</button>
                </div>
                <div className='container-img'>
                    <img src={intro} alt='ações'/>  
                </div>
            </div>
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