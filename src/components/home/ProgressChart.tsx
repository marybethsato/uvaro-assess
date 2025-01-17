import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProgressChart: React.FC = () => {
    const data = {
        labels: ['Oct 12, 2024', 'Oct 13, 2024', 'Oct 14, 2024', 'Oct 15, 2024'],
        datasets: [
            {
                label: 'Financial Health',
                data: [3, 4, 3, 3],
                borderColor: 'red',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4, // Smooth curve
            },
            {
                label: 'Work You Enjoy',
                data: [5, 3, 4, 4],
                borderColor: 'blue',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.4, // Smooth curve
            },
            {
                label: 'Life Choice Fulfillment',
                data: [4, 3, 3, 5],
                borderColor: 'orange',
                backgroundColor: 'rgba(255, 165, 0, 0.5)',
                tension: 0, // Straight line
            },
            {
                label: 'Peer Community Fulfillment',
                data: [2, 3, 4, 5],
                borderColor: 'green',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0, // Straight line
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true, // Enable the legend
                position: 'top', // Position it at the top
                labels: {
                    boxWidth: 10, // Smaller legend box width
                    boxHeight: 10, // Smaller legend box height
                    font: {
                        size: 10, // Smaller font size for the legend
                    },
                },
            },
        },
        scales: {
            y: {
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1, // Only show whole numbers
                },
            },
        },
    };

    return (
        <div className="mt-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold">Progress</h2>
                <a href="#" className="text-sm text-red-600 hover:underline">
                    View all
                </a>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                {/* Chart */}
                <div className="h-64">
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ProgressChart;
