const express = require ('express');
const app = express();
const path = require('path');
//app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
const conn = require('./dbconfig');
const functions = require('./functions');

var CronJob = require('cron').CronJob;
const Serialport = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new Serialport('COM3', {baudRate: 9600});
const parser = port.pipe(new Readline({ delimeter: '\n' }));


const socket = require('socket.io');
const http = require ('http');
const server = http.createServer(app);
const io = socket.listen(server);
server.listen(3000, function(){
    console.log('Server listening on port', 3000);
});
app.use(express.static(__dirname + '/views'));
app.use(require("./routes/routes"));

global.EstadoSensorViento = true;
global.EstadoSensorTemperatura = true;
global.EstadoSensorHumedad = true;

//--------------------------  ARDUINO  -----------------------------------------------
var GAB
parser.on('data', function(data) {
    var RTA = data.substring(0, 4)
    if ( data.substring(0, 3) == 'GAB')
        GAB = data.charAt(4)
    
    // console.log(data.charAt(4))
    // console.log(data)
    
    if (RTA == 'Humi'){
        humedad_arduino = data.substring(10, 15);
        temperatura_arduino = data.substring(31, 36);
        viento_arduino = data.substring(56, 59);
        if (viento_arduino.charAt(2) == 'K')
        viento_arduino = '0'+viento_arduino.substring(0, 2);
        else
        if (viento_arduino.charAt(1) == 'K')
            viento_arduino = '00'+viento_arduino.substring(0, 1);
        viento_arduino = viento_arduino.substring(0, 3);
        
            // io.emit('viento', viento_arduino);
       
            console.log('Humedad:'+ humedad_arduino+' Temperatura:'+ temperatura_arduino+' Viento:'+ viento_arduino+' GAB: '+ GAB)
            ValoresMaxGauges(io, temperatura_arduino, humedad_arduino, viento_arduino, GAB);
    }
});
var job;
async function freq(timer) {
    const result = await conn.query('SELECT frecuencia_muestreo FROM configuracion WHERE id_config=1');
    timerSql = result[0].frecuencia_muestreo;
    if (timerSql)
        timer = timerSql;
    if (job)
        job.stop()
    job = new CronJob('*/' + timer + ' * * * * *', function() {
        console.log(this.cronTime.source)
        port.write('DATA');
        port.write('\n');
    }, null, true, 'America/Los_Angeles');
    job.start();
}
freq(1)


app.get('/ard/:action', function (req, res) {
    var action = req.params.action || req.param('action');
    port.write(action);
    port.write('\n');
    res.status(200).send('ok')
 });
//-------------------------------------------------------------------------


//-------------------  Simular Arduino (entre comillas)----
// var GAB;
// var valor_temp;
// var valor_hum;
// var valor_vent;
// var job;
// async function freq(timer) {
//     const result = await conn.query('SELECT frecuencia_muestreo FROM configuracion WHERE id_config=1');
//     timer = result[0].frecuencia_muestreo;
//     if (job)
//         job.stop()
//     job = new CronJob('*/' + timer + ' * * * * *', function() {
//         if (EstadoSensorViento) {
//             valor_vent = Math.random() * 64;
//         }else{
//             valor_vent = 0;
//         }
//         if (EstadoSensorTemperatura) {
//             valor_temp = Math.random() * 59;
//         }else{
//             valor_temp = 0;
//         }
//         if (EstadoSensorHumedad) {
//             valor_hum = Math.random() * 100;
//         }else{
//             valor_hum = 0;
//         }
//         GAB = 0; // GABINETE!!! Cambiar a mano
//         console.log('Humedad:' + valor_hum + ' Temperatura:'+ valor_temp + ' Viento:'+ valor_vent+ ' Gabinete: '+ GAB)
//         ValoresMaxGauges(io, valor_temp, valor_hum, valor_vent, GAB);
//     }, null, true, 'America/Los_Angeles');
//     job.start();
// }
// freq(1);
//----------------------------------------------------------

// Metodo que envia los valores a los gauges (valor_temp, valor_hum y valor_vent son recibidos de la placa)
async function ValoresMaxGauges(socket, valor_temp, valor_hum, valor_vent, valor_gab){

    //conn.connect();
    const result_crit = await conn.query(`SELECT critico_max, critico_min FROM sensor`);
    temp_max = result_crit[0].critico_max;
    vent_max = result_crit[1].critico_max;
    vent_mincrit = result_crit[1].critico_min;
    hum_max = result_crit[2].critico_max;

    const result = await conn.query(`SELECT valor_transferencia_A, valor_transferencia_B, valor_transferencia_C FROM sensor`);
    temperatura = (valor_temp* result[0].valor_transferencia_A) * (valor_temp* result[0].valor_transferencia_A) + valor_temp* result[0].valor_transferencia_B + result[0].valor_transferencia_C;
    viento = (valor_vent* result[1].valor_transferencia_A) * (valor_vent* result[1].valor_transferencia_A) + valor_vent* result[1].valor_transferencia_B + result[1].valor_transferencia_C;
    humedad = (valor_hum* result[2].valor_transferencia_A) * (valor_hum* result[2].valor_transferencia_A) + valor_hum* result[2].valor_transferencia_B + result[2].valor_transferencia_C;
    
    const resultado_critico = await functions.func(viento);
    console.log(resultado_critico);

    
    const result_luz = await conn.query('SELECT horario_encendido_luminaria, horario_apagado_luminaria, email_notificacion, frecuencia_muestreo FROM configuracion where id_config=1');
    //conn.end();

    socket.emit('cargarGauges', {temperatura, humedad, viento, temp_max, hum_max, vent_max, vent_mincrit, result_luz, EstadoSensorViento, EstadoSensorTemperatura, EstadoSensorHumedad, valor_gab});
    
    

} 

/////-----------------Control Luminarias-----------------------


var job2 = new CronJob('* * * * * *', function() {
    verificarEstadoLuces();
}, null, true, 'America/Los_Angeles');
job2.start();
/*
app.get('/freq/:seg', function (req, res) {
    // var action = req.params.action || req.param('action');
    console.log(req.params.seg);
    freq(req.params.seg)
    res.status(200).send('ok')
 });
*/
 
var bodyParser = require('body-parser');
const { time } = require('console');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

 app.post('/frec_muestreo', urlencodedParser, async function(req, res){
    // var action = req.params.action || req.param('action');
    let {input_frec} = req.body;
    const result = await conn.query(`UPDATE configuracion SET frecuencia_muestreo=`+input_frec+` WHERE id_config=1 `);
    
    console.log(input_frec);
    freq(input_frec)
    //res.status(200).send('ok');
    res.render('admin.html', { 
    });
 });

async function verificarEstadoLuces(){
        const result_hora = await conn.query('SELECT horario_encendido_luminaria, horario_apagado_luminaria FROM configuracion WHERE id_config=1');
        hora = new Date().toLocaleString().substring(10, 19);
        h = parseInt(hora.substring(0, 2), 10);
        h_DB_ON = parseInt(result_hora[0].horario_encendido_luminaria.substring(0, 2), 10);
        h_DB_OFF = parseInt(result_hora[0].horario_apagado_luminaria.substring(0, 2), 10);
        m = parseInt(hora.substring(3, 5), 10);
        m_DB_ON = parseInt(result_hora[0].horario_encendido_luminaria.substring(3, 5), 10);
        m_DB_OFF = parseInt(result_hora[0].horario_apagado_luminaria.substring(3, 5), 10);
    
        if (h_DB_ON > h_DB_OFF){
            if ((h_DB_ON < h) || (h < h_DB_OFF) || ((h_DB_ON == h) && (m_DB_ON < m)) || ((h_DB_OFF == h) && (m_DB_OFF > m))){
                //Encender luces
                console.log('Encendido');
                port.write('LUCO');
                port.write('\n');
            }else{
                console.log('Apagado');
                port.write('LUCF');
                port.write('\n');
            }
        }else{
            if(((h_DB_ON < h) || ((h_DB_ON == h) && (m_DB_ON < m))) && ((h < h_DB_OFF) || ((h_DB_OFF == h) && (m_DB_OFF > m)))){
                //Encender luces
                console.log('Encendido');
                port.write('LUCO');
                port.write('\n');
            }else{
                console.log('Apagado');
                port.write('LUCF');
                port.write('\n');
            }
        }
}
/////-----------------Control Luminarias-----------------------
