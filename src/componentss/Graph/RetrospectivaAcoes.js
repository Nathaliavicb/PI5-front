import acoes from '../../dados/acoes.json';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function RetrospectivaAcoes({ acoesSalvas }) {
    const chartRef = useRef(null);

    useEffect(() => {
        // Filtrar os dados das ações apenas para as empresas selecionadas
        const acoesSelecionadas = acoes.filter(acao => acoesSalvas.includes(acao.empresa));
        const labels = acoesSelecionadas.map(acao => acao.empresa);
        const data = {
            labels: labels,
            datasets: [{
                axis: 'y',
                label: 'Valor das Ações',
                data: acoesSelecionadas.map(acao => acao.preco_atual),
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
                    y: {
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
    }, [acoesSalvas]);

    return <canvas ref={chartRef} />;
}

export default RetrospectivaAcoes;
