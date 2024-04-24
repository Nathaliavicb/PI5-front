import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './acoes.css';
import acoesData from '../../dados/acoes.json';
import { toast } from 'react-toastify';

function Acoes(){
    const { id } = useParams();
    const [acoes, setAcoes] = useState([]);

    useEffect(() => {
        setAcoes(acoesData);
    }, []);

    function salvarAcao(index) {
        const acaoSelecionada = acoes[index];
        const minhaLista = localStorage.getItem("@matosflix");
        let acoesSalvas = JSON.parse(minhaLista) || [];

        const hasAcao = acoesSalvas.some((acao) => acao.empresa === acaoSelecionada.empresa);

        if (hasAcao) {
            toast.warn("Essa ação já está na sua lista!");
            return;
        }

        acoesSalvas.push(acaoSelecionada);
        localStorage.setItem("@matosflix", JSON.stringify(acoesSalvas));
        toast.success("Ação salva com sucesso!");
    }

    return (
        <>
            <div className='containerAcoes'>
                <div className='lista-acoes-fav'>
                    {acoes.map((acao, index) => (
                        <div className="acao" key={index}>
                            {index == id && (
                                <>
                                    <h3>{acao.empresa}</h3>
                                    <p><strong>Descrição:</strong> {acao.descricao}</p>
                                    <p><strong>Setor:</strong> {acao.setor}</p>
                                    <p><strong>Fundação:</strong> {acao.fundacao}</p>
                                    <p><strong>Preço Atual:</strong> R${acao.preco_atual}</p>
                                    <p><strong>Variação:</strong> {acao.variacao}</p>
                                    <p><strong>Volume Negociado:</strong> {acao.volume_negociado}</p>
                                    <p><strong>Última Atualização:</strong> {acao.ultima_atualizacao}</p>
                                    <div className="areaBtnAcoes">
                                        <button onClick={() => salvarAcao(index)} className="btnSalvar">Salvar</button>
                                        <Link className="btnVoltar" to={`/`}>Voltar</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Acoes;
