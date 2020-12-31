var tempobj = {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Temperature',
            data: [28.5,27.5, 27.79, 28.27, 28.74, 28.3],
            backgroundColor: [
                'rgba(217,83,79,0.3)',
                'rgba(217,83,79,0.3)',
                'rgba(217,83,79,0.3)',
                'rgba(217,83,79,0.3)',
                'rgba(217,83,79,0.3)'
            ],
            borderColor: [
                'rgba(240,173,78,1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Moisture',
            data: [48.39, 57.56, 67.64, 76.49, 81.23],
            backgroundColor: [
                'rgba(2,117,216,0.3)',
                'rgba(2,117,216,0.3)',
                'rgba(2,117,216,0.3)',
                'rgba(2,117,216,0.3)',
                'rgba(2,117,216,0.3)'
            ],
            borderColor: [
                'rgba(240,173,78,1)'
            ],
            borderWidth: 1,
            type: 'line'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}

var tempGraph = document.getElementById('temperature-moisture').getContext('2d');
var tempchart = new Chart(tempGraph, tempobj);
var i = 6;

function updateTemp(){
    tempchart.data.datasets[0].data[5] = Math.random()+27 ;
    tempchart.data.datasets[1].data[5] = Math.random()+67.64 ;
    tempchart.data.datasets[0].data.shift();
    tempchart.data.datasets[1].data.shift();
    tempchart.data.labels.shift();
    tempchart.data.labels[5] = i.toString();
    i=i+1;
    tempchart.update()
}

setInterval(updateTemp, 3000);


var pressureobj = {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
            label: 'pressure',
            data: [2.1, 2.2, 2.0, 1.8, 1.9 ],
            backgroundColor: [
                'rgba(41,43,44,0.3)',
                'rgba(41,43,44,0.3)',
                'rgba(41,43,44,0.3)',
                'rgba(41,43,44,0.3)',
                'rgba(41,43,44,0.3)'
            ],
            borderColor: [
                'rgba(240,173,78,1)'
            ],
            borderWidth: 1,
            type: 'line'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}

var pressGraph = document.getElementById('pressure').getContext('2d');
var presschart = new Chart(pressGraph, pressureobj);
var j = 6;

function updatePress(){
    presschart.data.datasets[0].data[5] = Math.random()+2 ;
    presschart.data.datasets[0].data.shift();
    presschart.data.labels.shift();
    presschart.data.labels[5] = j.toString();
    j=j+1;
    presschart.update()
}

setInterval(updatePress, 3000);

var humidityobj = {
    type: 'line',
    data: {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [{
            label: 'humidity',
            data: [0.283, 0.309, 0.389, 0.461, 0.639, 0.652 ],
            backgroundColor: [
                'rgba(92,184,92,0.3)',
                'rgba(92,184,92,0.3)',
                'rgba(92,184,92,0.3)',
                'rgba(92,184,92,0.3)',
                'rgba(92,184,92,0.3)'
            ],
            borderColor: [
                'rgba(240,173,78,1)'
            ],
            borderWidth: 1,
            type: 'line'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
}

var humGraph = document.getElementById('humidity').getContext('2d');
var humchart = new Chart(humGraph, humidityobj);
var k = 6;

function updateHum(){
    humchart.data.datasets[0].data[5] = Math.random() ;
    humchart.data.datasets[0].data.shift();
    humchart.data.labels.shift();
    humchart.data.labels[5] = j.toString();
    j=j+1;
    humchart.update()
}

setInterval(updateHum, 3000);

var rainfallpredobj =  {
    type: 'doughnut',
    data: {
      labels: ['Partly Cloudy','Mostly Cloudy','Overcast','Foggy','Breezy and Mostly Cloudy','Clear','Breezy and Partly Cloudy','Breezy and Overcast','Humid and Mostly Cloudy','Humid and Partly Cloudy','Windy and Foggy','Windy and Overcast','Breezy and Foggy','Windy and Partly Cloudy','Breezy' ,'Dry and Partly Cloudy','Windy and Mostly Cloudy' ,'Dangerously Windy and Partly Cloudy' ,'Dry'],
      datasets: [{
        label: '# of Tomatoes',
        data:[9.73920178e-05, 7.51363768e-05, 0.000241446513, 0.000844836584, 0.000830702134, 0.256503284, 5.42976473e-08, 1.28196233e-22, 1.08774575e-16, 0.0534175783, 3.15342045e-13, 2.23812701e-14, 0.0177928898, 0.600110471, 0.069884561, 4.09376355e-07, 1.07743272e-05, 7.13685222e-05, 0.000119068813],
        backgroundColor: [
          'rgba(245, 99, 132, 0.5)',
          'rgba(5, 162, 235, 0.2)',
          'rgba(155, 206, 96, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(259, 100, 132, 0.5)',
          'rgba(53, 162, 235, 0.2)',
          'rgba(256, 129, 256, 0.2)',
          'rgba(245, 99, 132, 0.5)',
          'rgba(58, 162, 235, 0.2)',
          'rgba(258, 206, 126, 0.2)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(53, 162, 235, 0.2)',
          'rgba(285, 206, 86, 0.2)',
          'rgba(155, 206, 86, 0.2)',
          'rgba(265, 99, 262, 0.5)',
          'rgba(59, 162, 235, 0.2)',
          'rgba(255, 206, 156, 0.2)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 182, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
         //cutoutPercentage: 40,
      responsive: false,
  
    }
  };

var rainpredGraph = document.getElementById('rainfall-prediction').getContext('2d');
var rainpredChart = new Chart(rainpredGraph, rainfallpredobj);
var k = 6;

// function updaterainfall(){
//     rainpredChart.data.datasets[0].data[5] = Math.random() ;
//     rainpredChart.data.datasets[0].data.shift();
//     rainpredChart.data.labels.shift();
//     rainpredChart.data.labels[5] = j.toString();
//     j=j+1;
//     rainpredChart.update()
// }







var json = {
    "signature_name": "serving_default", 
    "instances": [[-1.0, 9.355556, 0.86]]
}
axios.post('http://localhost:8501/v1/models/weather_model/', {
    data:json
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })