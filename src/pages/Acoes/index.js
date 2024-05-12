import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './acoes.css';
import acoesData from '../../dados/acoes.json';
import { Line } from 'react-chartjs-2';
import { useTable } from 'react-table';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from 'chart.js';
import Footer from '../../componentss/Footer';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend);

function Acoes() {
    const { id } = useParams();
    const [selectedAcao, setSelectedAcao] = useState(null);

    useEffect(() => {
        const index = parseInt(id);
        const acaoSelecionada = acoesData[index];
        setSelectedAcao(acaoSelecionada);
    }, [id]);

    const labels = selectedAcao ? selectedAcao.historico.map(item => item.data) : [];
    const precoAtualData = selectedAcao ? selectedAcao.historico.map(item => item.preco) : [];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Preço Atual',
                data: precoAtualData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Data',
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 16
                    }
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Preço (R$)',
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 16
                    }
                },
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Empresa',
                accessor: 'empresa',
            },
            {
                Header: 'Preço Atual',
                accessor: 'preco_atual',
            },
            {
                Header: 'Variação',
                accessor: 'variacao',
            },
            {
                Header: 'Volume Negociado',
                accessor: 'volume_negociado',
            },
            {
                Header: 'Última Atualização',
                accessor: 'ultima_atualizacao',
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: selectedAcao ? [selectedAcao] : [] });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    function salvarAcao() {
        const minhaLista = localStorage.getItem("@matosflix");
        let acoesSalvas = JSON.parse(minhaLista) || [];

        const hasAcao = acoesSalvas.some((acao) => acao.empresa === selectedAcao.empresa);

        if (hasAcao) {
            alert("Essa ação já está na sua lista!");
            return;
        }

        acoesSalvas.push(selectedAcao);
        localStorage.setItem("@matosflix", JSON.stringify(acoesSalvas));

        alert("Ação salva com sucesso!");
    }

    return (
        <>
            <div className='containerAcoes'>
                <div className='lista-acoes-fav'>
                    <div className="acao">
                        {selectedAcao && (
                            <>
                                <div className='container-info-acoes'>                
                                    <h3>{selectedAcao.empresa}</h3>
                                    <p><strong>Descrição:</strong> {selectedAcao.descricao}</p>
                                    <p><strong>Fundação:</strong> {selectedAcao.fundacao}</p>
                                    <p><strong>Setor:</strong> {selectedAcao.setor}</p>
                                </div>
                
                            </>
                        )}
                    </div>
                    <div className='chart'>
                        {selectedAcao && <Line data={data} options={options} />}
                    </div>
                    <div className='table-container'>
                        <table {...getTableProps()} className='acoes-table'>
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="areaBtnAcoes">
                        <button onClick={salvarAcao} className="btnSalvar">Salvar</button>
                        <Link className="btnVoltar" to={`/`}>Voltar</Link>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    );
}

export default Acoes;
