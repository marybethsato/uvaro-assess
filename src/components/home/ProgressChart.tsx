import {
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getFormattedEndDates, processAssessments } from '../../data/format_chart_data';
import Assessment from '../../interfaces/assessment';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ProgressChartProps {
    assessments: Assessment[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ assessments }) => {
    const [data, setData] = useState<ChartData<'line', (number | null)[], string>>();

    useEffect(() => {
        console.log(assessments);
        const groupedLevels: Record<number, number[]> = processAssessments(assessments);
        const labels: string[] = getFormattedEndDates(assessments);
        console.log(groupedLevels);
    
        setData({
            labels:labels,
            datasets: [
                {
                    label: 'Financial Health',
                    data: groupedLevels[1] ?? [],
                    borderColor: 'red',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    tension: 0.4, // Smooth curve
                },
                {
                    label: 'Work You Enjoy',
                    data: groupedLevels[2] ?? [],
                    borderColor: 'blue',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    tension: 0.4, // Smooth curve
                },
                {
                    label: 'Life Choice Fulfillment',
                    data:groupedLevels[3] ?? [],
                    borderColor: 'orange',
                    backgroundColor: 'rgba(255, 165, 0, 0.5)',
                    tension: 0, // Straight line
                },
                {
                    label: 'Peer Community Fulfillment',
                    data: groupedLevels[4] ?? [],
                    borderColor: 'green',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    tension: 0, // Straight line
                },
            ],
        })
    }, [assessments]);




    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 10,
                    boxHeight: 10,
                    font: {
                        size: 10,
                    },
                },
            },
        },
        scales: {
            y: {
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="mt-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-bold">Progress</h2>
                <a href="#" className="text-sm text-red-600 hover:underline">
                    View all
                </a>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
                <div className="h-64">
                    {data && <Line data={data} options={options} />}

                </div>
            </div>
        </div>
    );
};

export default ProgressChart;

