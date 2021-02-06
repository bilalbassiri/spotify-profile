import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

let Chart = ({ features }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Audio Features',
            fontSize: 18,
            fontColor: 'rgb(186, 186, 186)'
        },
        legend: {
            display: false
        },
        layout: {
            padding: {
                right: 12,
                left: 12,
                top: 40,
                bottom: 50
            },
        },
        scales: {

            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'rgb(186, 186, 186)',
                        fontSize: 11
                    },
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)',
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: 'rgb(186, 186, 186)'
                    },
                    gridLines: {
                        color: 'rgba(0, 0, 0, 0)'
                    },
                }
            ]
        },
    }
    const data = {
        labels: [
            'Acousticness',
            'Danceability',
            'Energy',
            'Liveness',
            'Speechiness',
            'Valence'],
        datasets: [
            {
                data: [features.acousticness,
                features.danceability,
                features.energy,
                features.liveness,
                features.speechiness,
                features.valence,],
                backgroundColor: [
                    'rgba(255, 99, 132, .5)',
                    'rgba(54, 162, 235, .5)',
                    'rgba(255, 206, 86, .5)',
                    'rgba(75, 192, 192, .5)',
                    'rgba(153, 102, 255, .5)',
                    'rgba(255, 159, 64, .5)',
                ],
                borderWidth: 0,
            }
        ]
    }


    return (

        <div style={{ position: 'relative', width: '100%'}}>
            <HorizontalBar
                data={data}
                options={options}
                height={500}
                width={200}
            />
        </div>

    )
}

export default Chart
