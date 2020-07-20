const socket = io();

 var renderizado = false;
 
 $('#login-button').on('click', function(){
    console.log('ENTRO');
    const user = $('#user').val();
    const pass = $('#password').val();

    console.log(user);
    console.log(pass);
});


// $('#frec').on('click', function(){
//     const freq = $('#input_frec').val();
//     console.log(freq);
//     var request = new XMLHttpRequest();
//     request.open('GET', 'localhost:3000/freq/'+freq, true);
//     request.send();
// });

$('#reporteExcel').on('click', function(){
    event.stopPropagation();
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: '/Excel'
      }).done(function(response){
          console.log('AJAX-GET EXCEL REPORT SUCCESS')
          alert('Reporte Excel creado con exito!');
          var link = document.createElement('a');
          link.href = '/ReporteExcel.xlsx';
          link.target = '_blank';
          link.download = 'Reporte';
          link.click();
      }).error(function(response){
          console.log('AJAX-GET EXCEL REPORT ERROR ', response)
          alert('Ha ocurrido un error generando el reporte.');
      })
});

$('#reportePDF').on('click', function(){
    event.stopPropagation();
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: '/PDF'
      }).done(function(response){
          console.log('AJAX-GET PDF REPORT SUCCESS')
          alert('Reporte PDF creado con exito!');
          var link = document.createElement('a');
          link.href = '/Reporte.pdf';
          link.target = '_blank';
          link.download = 'Reporte';
          link.click();
      }).error(function(response){
          console.log('AJAX-GET PDF REPORT ERROR', response)
          alert('Ha ocurrido un error generando el reporte.');
      })
});

 socket.on('cargarGauges', function(data){
     
    if (data.viento >= data.vent_mincrit){
        document.getElementById("label_alertaMet").style.display = "block";
    }else{
        document.getElementById("label_alertaMet").style.display = "none";
    }
    if (data.valor_gab == 1){
        document.getElementById("label_gabinete").style.display = "block";
    }else{
        document.getElementById("label_gabinete").style.display = "none";
    }
    cargarGauges(data);
    

    usuario = $("#userType").val();
    console.log(usuario);
    if (usuario == "admin"){
        if (!renderizado){
            cargarDatosAdminView(data);
            renderizado = true;
        }
    }else{
        cargarDatosUserView(data);
    }
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

 function cargarDatosAdminView(data){
    if (!data.EstadoSensorTemperatura){
        document.getElementById("cbox1").checked = true;
        document.getElementById("gaugeTemp").style.display = "none";
    }
    if (!data.EstadoSensorHumedad){
        document.getElementById("cbox2").checked = true;
        document.getElementById("gaugeHum").style.display = "none";
    }
    if (!data.EstadoSensorViento){
        document.getElementById("cbox3").checked = true;
        document.getElementById("gaugeViento").style.display = "none";
    }

    
    horario_encendido = document.getElementById("input_encender_luz");
    horario_encendido.value = data.result_luz[0].horario_encendido_luminaria;
    horario_apagado = document.getElementById("input_apagar_luz");
    horario_apagado.value = data.result_luz[0].horario_apagado_luminaria;
    email = document.getElementById("input_email_notificacion");
    email.value = data.result_luz[0].email_notificacion;
    frec = document.getElementById("input_frec");
    console.log(data.result_luz[0].frecuencia_muestreo)
    frec.value = data.result_luz[0].frecuencia_muestreo;
 }

 function cargarDatosUserView(data){
    if (!data.EstadoSensorTemperatura){
        document.getElementById("gaugeTemp").style.display = "none";
    }
    if (!data.EstadoSensorHumedad){
        document.getElementById("gaugeHum").style.display = "none";
    }
    if (!data.EstadoSensorViento){
        document.getElementById("gaugeViento").style.display = "none";
    }

    
    horario_encendido = document.getElementById("label_luces_encendido");
    horario_encendido.innerHTML = data.result_luz[0].horario_encendido_luminaria;
    horario_apagado = document.getElementById("label_luces_apagado");
    horario_apagado.innerHTML = data.result_luz[0].horario_apagado_luminaria;

 }