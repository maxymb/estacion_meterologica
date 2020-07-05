 const socket = io();

 socket.on('cargarGauges', function(data){
    cargarGauges(data);

    horario_encendido = document.getElementById("input_encender_luz");
    horario_encendido.value = data.result_luz[0].horario_encendido_luminaria;
    horario_apagado = document.getElementById("input_apagar_luz");
    horario_apagado.value = data.result_luz[0].horario_apagado_luminaria;
    email = document.getElementById("input_email_notificacion");
    email.value = data.result_luz[0].email_notificacion;
    
 });
 
 
 function cargarGauges(data){
    google.charts.load('current', {'packages':['gauge']});
            google.charts.setOnLoadCallback(drawChart);
            async function drawChart() {

                val_temp = data.temperatura;
                val_temp_max = data.temp_max;
                val_hum = data.humedad;
                val_hum_max = data.hum_max;
                val_vent = data.viento;
                val_vent_max = data.vent_max;
                val_vent_critmin = data.vent_mincrit;

                var dataTemp = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Temperatura', val_temp]
                ]);

                var dataHum = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Humedad', val_hum]
                ]);

                var dataViento = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['Viento', val_vent]
                ]);

                var optionsTemp = {
                width: 400, height: 120,
                minorTicks: 5, max: val_temp_max
                };

                var optionsHum = {
                width: 400, height: 120,
                minorTicks: 5, max: val_hum_max
                };

                var optionsViento = {
                width: 400, height: 120,
                redFrom: val_vent_critmin, redTo: val_vent_max,
                greenFrom:0, greenTo: 6,
                minorTicks: 5, max: val_vent_max
                };

                var chartTemp = new google.visualization.Gauge(document.getElementById('gaugeTemp'));
                var chartHum = new google.visualization.Gauge(document.getElementById('gaugeHum'));
                var chartViento = new google.visualization.Gauge(document.getElementById('gaugeViento'));
                
                chartTemp.draw(dataTemp, optionsTemp);
                setInterval(function() {
                    dataTemp.setValue(0, 1, val_temp);
                    chartTemp.draw(dataTemp, optionsTemp);
                }, 1000);
                chartHum.draw(dataHum, optionsHum);
                setInterval(function() {
                    dataHum.setValue(0, 1, val_hum);
                    chartHum.draw(dataHum, optionsHum);
                }, 1000);

                chartViento.draw(dataViento, optionsViento);
                setInterval(function() {
                    dataViento.setValue(0, 1, val_vent);
                    chartViento.draw(dataViento, optionsViento);
                }, 1000);
            }

 }