import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './acoes.css';
import acoesData from '../../database/acoes.json';
import { Line } from 'react-chartjs-2';
import { useTable } from 'react-table';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import Footer from '../../componentss/Footer';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

function Acoes() {
    const { id } = useParams();
    const [selectedAcao, setSelectedAcao] = useState(null);

    useEffect(() => {
        const index = parseInt(id);
        const acaoSelecionada = acoesData[index];
        setSelectedAcao(acaoSelecionada);
    }, [id]);

    const data = {
        labels: selectedAcao ? [selectedAcao.empresa] : [],
        datasets: [
            {
                label: 'Preço Atual',
                data: selectedAcao ? [selectedAcao.preco_atual] : [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
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
                        {selectedAcao && <Line data={data} />}
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
