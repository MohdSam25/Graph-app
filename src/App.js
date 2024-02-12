import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineGraph = () => {
    const [xData, setXData] = useState([]);
    const [yData, setYData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch First 50 RandomNumbers from the x-axis API
                const xResponse = await axios.get('https://retoolapi.dev/gDa8uC/data');
                const xValues = xResponse.data.map(item => item.RandomNumber).slice(0,50);

                // Fetch First 50 numbers RandomNumbers from the y-axis API
                const yResponse = await axios.get('https://retoolapi.dev/o5zMs5/data');
                const yValues = yResponse.data.map(item => item.RandomNumber).slice(0,50);

                // Set the fetched data to state variables
                setXData(xValues);
                setYData(yValues);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Create chart data
    const chartData = {
        labels: xData,
        datasets: [ {
            label: 'X-Axis Data',
            data: xData,
            fill: false,
            borderColor: 'rgb(75, 75, 75)',
            tension: 0.1
        },
            {
                label: 'Y-Axis Data',
                data: yData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <h2>Line Graph</h2>
            <div style={{ height: '8002px', width: '1000px' }}>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default LineGraph;
