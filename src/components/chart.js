import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const checkCurrency = (cur) => {
  switch(cur) {
    case 'United States Dollar': return 'USD';
    case 'British Pound Sterling': return 'GBP';
    case 'Euro': return 'EUR';
    default: return 'USD';
  }
};

export default function Chart(prop) {
  const [bitData, setData] = useState({});
  let currency = checkCurrency(prop.cur);
  var oneMonthAgo = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    new Date().getDate()
  ).toISOString().replace(/T.*/,'').split('-').join('-');

  let endDate = new Date().toISOString().replace(/T.*/,'').split('-').join('-');

  useEffect(() => {
    async function fetchData() {
      await fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${oneMonthAgo}&end=${endDate}`)
            .then(resp => resp.json())
            .then(data => {
              setData(data.bpi)
            });
    }
    fetchData();
  }, [prop.cur]);

  const lineData = {
    labels: Object.keys(bitData).map((item, index) => index),
    datasets: [
      {
        label: 'Last 60 Days trend',
        fill: true,
        lineTension: 0.5,
        backgroundColor: 'rgba(219,243,228,1)',
        borderColor: 'rgba(104,187,106,1)',
        borderWidth: 2,
        data: Object.keys(bitData).map(item => bitData[item]),
      }
    ]
  }
  const options = {
    bezierCurve: false, 
    title: {
      display: true,
      text: 'Last 60 Days Trend',
    },
    elements: {
      point: {
        radius: 0
      },
    },
    legend: {
      display: false
    },
    layout: {
      padding: {
         left: 50,
         right: 0,
         top: 0,
         bottom: 0
       }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 40000,
            suggestedMax: 70000,
            stepSize: 10000
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0.1)",
          }
        }
      ]
    }
  };

  return(
    <div className="chart-wrapper">
      <Line data={lineData} options={options}/>
    </div>
  );
};
