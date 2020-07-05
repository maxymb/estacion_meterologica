const express = require ('express');
const app = express();
const path = require('path');
//app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
const conn = require('./dbconfig');
const functions = require('./functions');


const socket = require('socket.io');
const http = require ('http');
const server = http.createServer(app);
const io = socket.listen(server);
server.listen(3000, function(){
    console.log('sever listening on port', 3000);
});
app.use(express.static(__dirname + '/views'));
app.use(require("./routes/routes"));


//------------------------   Comunicacion Serial -----------------------------
/*
const SerialPort = require ('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
});

const parser = port.pipe(new ReadLine({delimiter: '\r\n'}));
parser.on('open', function(){
    console.log('Connection is opened');
});
parser.on('data', function(data){
    let temp = parseInt(data, 10) + '°C'
    console.log('Connection is opened');
    io.emit('temperatura', data);
});

port.on('error', function(err){
    console.log(err);
});
*/
//-------------------------------------------------------------------------



//-------------------  Simular Arduino (entre comillas)----
var valor_temp = Math.random() * 100;
var valor_hum = Math.random() * 100;
var valor_vent = Math.random() * 100;
io.on('connection', (socket)=> {
    console.log('New connection ID: ', socket.id);
    ValoresMaxGauges(socket, valor_temp, valor_hum, valor_vent);                   // <----Llamado al metodo de abajo para que envie los valores al html
    valor_temp = Math.random() * 100;
    valor_hum = Math.random() * 100;
    valor_vent = Math.random() * 100;
})
//----------------------------------------------------------

// Metodo que envia los valores a los gauges (valor_temp, valor_hum y valor_vent son recibidos de la placa)
async function ValoresMaxGauges(socket, valor_temp, valor_hum, valor_vent){

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

    
    const result_luz = await conn.query('SELECT horario_encendido_luminaria, horario_apagado_luminaria, email_notificacion FROM configuracion where id_config=1');
    //conn.end();

    socket.emit('cargarGauges', {temperatura, humedad, viento, temp_max, hum_max, vent_max, vent_mincrit, result_luz});
} 



/////-----------------Navegacion-----------------------

//Inicial
app.listen(app.get('port'), () => {
    console.log('App-Server on port', app.get('port'));
});

