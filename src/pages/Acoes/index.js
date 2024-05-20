import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './acoes.css';
import { Line } from 'react-chartjs-2';
import { useTable } from 'react-table';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend } from 'chart.js';
import Footer from '../../componentss/Footer';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend);

function Acoes() {
    const { index, acaoIndex } = useParams();
    const [selectedAcao, setSelectedAcao] = useState(null);
    const [historicoAcoes, setHistoricoAcoes] = useState([]);

    useEffect(() => {
        async function fetchAcoes() {
            try {
                const response = await fetch('https://localhost:7022/api/Acoes/atualizar-dados');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHistoricoAcoes(data.historicoAcoes);
                const acaoSelecionada = data.historicoAcoes[parseInt(index)].acoes[parseInt(acaoIndex)];
                setSelectedAcao(acaoSelecionada);
            } catch (error) {
                console.error('Erro ao buscar ações:', error);
            }
        }
        fetchAcoes();
    }, [index, acaoIndex]);

    const labels = historicoAcoes.map(historico => historico.data);
    const precoAtualData = historicoAcoes.map(historico => 
        historico.acoes.find(acao => acao.acao === selectedAcao?.acao)?.valorCota || null
    ).filter(value => value !== null);

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
                Header: 'Ação',
                accessor: 'acao',
            },
            {
                Header: 'Valor Cota',
                accessor: 'valorCota',
            },
            {
                Header: 'Valor Total Investido',
                accessor: 'valorTotalInvestido',
            },
            {
                Header: 'Retorno Diário',
                accessor: 'retornoDiario',
            },
        ],
        []
    );

    const tableData = historicoAcoes.flatMap(historico => historico.acoes)
        .filter(acao => acao.acao === selectedAcao?.acao);

    const tableInstance = useTable({ columns, data: tableData });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    function salvarAcao() {
        const minhaLista = localStorage.getItem("@matosflix");
        let acoesSalvas = JSON.parse(minhaLista) || [];

        const hasAcao = acoesSalvas.some((acao) => acao.acao === selectedAcao.acao);

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
                                    <h3>{selectedAcao.acao}</h3>
                                    <div className='container-info-add'>
                                        <p><strong>Valor Cota:</strong> <span className="valorAcao">{selectedAcao.valorCota}</span></p>
                                        <p><strong>Valor Total Investido:</strong> <span className="valorAcao">{selectedAcao.valorTotalInvestido}</span></p>
                                        <p><strong>Retorno Diário:</strong> <span className="valorAcao">{selectedAcao.retornoDiario}%</span></p>
                                    </div>
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
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='btn-fav'>
                        <button onClick={salvarAcao}>Salvar Ação</button>
                        <Link to="/favoritos"><button>Ver Favoritos</button></Link>
                    </div>
                </div>
            </div>
            <div className='container-footer'>
                <Footer />
            </div>
        </>
    );
}

export default Acoes;
