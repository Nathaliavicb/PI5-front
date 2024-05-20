import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import intro from '../../assets/intro.jpg';
import Footer from '../../componentss/Footer';

function Home() {
    const [historicoAcoes, setHistoricoAcoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAcoes() {
            try {
                const response = await fetch('https://localhost:7022/api/Acoes/atualizar-dados');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistoricoAcoes(data.historicoAcoes);
            } catch (error) {
                console.error('Erro ao buscar ações:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchAcoes();
    }, []);

    const handleSaibaMaisClick = () => {
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
        <>
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
                    {historicoAcoes.map((historico, index) => (
                        <div className="linha-acoes" key={index}>
                            {historico.acoes.map((acao, acaoIndex) => (
                                <div className="acao-item" key={acaoIndex}>
                                    <h3>{acao.acao}</h3>
                                    <div className="container-acao-item">
                                        <p><strong>Valor da Cota:</strong> <span className="valorHome">{acao.valorCota}</span></p>
                                        <p><strong>Valor Total Investido:</strong> <span className="valorHome">{acao.valorTotalInvestido}</span></p>
                                        <p><strong>Retorno Diário:</strong> <span className="valorHome">{acao.retornoDiario}%</span></p>
                                    </div>
                                    <Link to={`/acao/${index}/${acaoIndex}`} className="botao-acompanhar">Acompanhar</Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className='container-footer'>
                <Footer />
            </div>
        </>
    );
}

export default Home;
