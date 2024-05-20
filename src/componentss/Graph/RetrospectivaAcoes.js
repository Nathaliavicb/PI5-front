import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RetrospectivaAcoes({ acoesSalvas }) {
    const chartRef = useRef(null);

    useEffect(() => {
        async function fetchAcoes() {
            try {
                const response = await fetch('https://localhost:7022/api/Acoes/historico-fechamento');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const acoesData = await response.json();

                const acoesSelecionadas = [];

                acoesData.historicoAcoes.forEach(historico => {
                    historico.acoes.forEach(acao => {
                        if (acoesSalvas.includes(acao.acao)) {
                            acoesSelecionadas.push(acao);
                        }
                    });
                });

                const labels = acoesSelecionadas.map(acao => acao.acao);
                const data = {
                    labels: labels,
                    datasets: [{
                        axis: 'y',
                        label: 'Valor das Ações',
                        data: acoesSelecionadas.map(acao => acao.valorCota),
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgb(255, 99, 132)',
                        borderWidth: 1
                    }]
                };

                const ctx = chartRef.current.getContext('2d');

                if (chartRef.current.chart) {
                    chartRef.current.chart.destroy();
                }

                chartRef.current.chart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: {
                        indexAxis: 'y',
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Valor das Ações',
                                    color: 'black',
                                    font: {
                                        weight: 'bold',
                                        size: 16
                                    }
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Empresas',
                                    color: 'black',
                                    font: {
                                        weight: 'bold',
                                        size: 16
                                    }
                                },
                                ticks: {
                                    font: {
                                        size: 10 
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 10, 
                                right: 10, 
                                top: 10, 
                                bottom: 10 
                            }
                        },
                        plugins: {
                            legend: {
                                display: false 
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Erro ao buscar ações:', error);
            }
        }
        fetchAcoes();
    }, [acoesSalvas]);

    return <canvas ref={chartRef} />;
}

export default RetrospectivaAcoes;
