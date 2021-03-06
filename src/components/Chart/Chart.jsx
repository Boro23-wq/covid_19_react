import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
    /* same as state (
        data: {}
    ) in a class base 
    setDailyData is the setter method*/
    //daily data is an empty array
    const [dailyData, setDailyData] = useState([]);

    //using hooks to populate the dailyData from the API
    useEffect(() =>{
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length //if array is empty (truthy/falsy factor)
        ? (
            <Line
            data = {{
                labels : dailyData.map(({ date }) => date),
                datasets : [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor : '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor : 'red',
                    backgroundColor : 'rgba(255, 0, 0, 0.5)',
                    fill: true,
                }]
            }}
            />) : null
    );

    //bar chart for individual countries
    const barChart = (
        confirmed 
        ? (
            <Bar
                data = {{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        data:[confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options = {{
                    legend: {display: false},
                    title: {display:true, text:`Current state in ${country}`},
                }}
            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart};
        </div>
    )
}

export default Chart;