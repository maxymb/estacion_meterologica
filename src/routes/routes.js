const express= require('express');
const router = express.Router();
const conn = require('../dbconfig');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });


router.post('/Temperatura', async (req, res) => {
    mostrarSensor(1, res);
})
router.post('/Viento', async (req, res) => {
    mostrarSensor(2, res);
})
router.post('/Humedad', async (req, res) => {
    mostrarSensor(3, res);
})

async function mostrarSensor(id_sensor, res){
    //conn.connect();
    const result = await conn.query('SELECT * FROM sensor WHERE id_sensor='+id_sensor+'');
    pedirCritico = "display:none;";
    if (id_sensor == 2){
        pedirCritico = "display:block;";
    }
    res.render('sensor.html', { 
        label_id_sensor : result[0].id_sensor,
        input_nombre_sensor: result[0].nombre,
        input_modelo_sensor: result[0].modelo,
        input_VTA_sensor: result[0].valor_transferencia_A,
        input_VTB_sensor: result[0].valor_transferencia_B,
        input_VTC_sensor: result[0].valor_transferencia_C,
        input_CritMin_sensor: result[0].critico_min,
        input_CritMax_sensor: result[0].critico_max,
        input_FrecMuestreo_sensor: result[0].frecuencia_muestreo,
        pedir_criticos: pedirCritico,
        hidden_id: result[0].id_sensor
    });
    //conn.end();
}

router.post('/modifi', urlencodedParser, async (req, res) => {
    const {input_nombre, input_modelo, input_VT_A, input_VT_B, input_VT_C, input_Cr_Max, input_Cr_Min, input_muestreo, hidden_id} = req.body;
    //conn.connect();
    const result = await conn.query('UPDATE sensor SET nombre="'+input_nombre+'", modelo="'+input_modelo+'", valor_transferencia_A='+input_VT_A+', valor_transferencia_B='+input_VT_B+', valor_transferencia_C='+input_VT_C+', critico_Max='+input_Cr_Max+', critico_Min='+input_Cr_Min+', frecuencia_muestreo='+input_muestreo+' WHERE id_sensor='+hidden_id+'');
    //conn.end();
    res.render('admin.html', { 
    });
})

router.post('/luces', urlencodedParser, async (req, res) => {
    const {input_encender_luz, input_apagar_luz} = req.body;
    //conn.connect();
    const result = await conn.query('UPDATE configuracion SET horario_encendido_luminaria="'+input_encender_luz+'", horario_apagado_luminaria="'+input_apagar_luz+'" WHERE id_config=1');
    //conn.end();
    res.render('admin.html', { 
    });
})

router.post('/email', urlencodedParser, async (req, res) => {
    const input_email_notificacion = req.body;
    //conn.connect();
    const result = await conn.query('UPDATE configuracion SET email_notificacion="'+input_email_notificacion+'" WHERE id_config=1');
    //conn.end();
    res.render('admin.html', { 
    });
})

///Responder pedido de reporte PDF
const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();

router.post('/PDF', urlencodedParser, async (req, res) => {
    //conn.connect();
    const result = await conn.query('SELECT * FROM evento');
    console.log(result);
    console.log(result.length);
    var contenido = "";
    index = 0;
    while (index < result.length){
        contenido = contenido + result[index].tipo_evento+ '\nEn el dia de fecha "'+result[index].fecha_y_hora+'", se registro un evento de tipo: '+result[index].tipo_evento+' \n\n' + 'Descripción: \n'+ result[index].descripcion+' \n\n\n';
    
        index = index +1;
    }
    doc.pipe(fs.createWriteStream('Reporte.pdf'));
    doc.fontSize(11)
            .text(contenido, 100, 100);
    doc.end();
    //conn.end();
})

router.post('/', async (req, res) =>{
    Admin = true;
    res.render('admin.html', { 
    });
})

router.post('/gaugeTemp', async (req, res) =>{
    if (EstadoSensorTemperatura){
        EstadoSensorTemperatura = false;
    }else {
        EstadoSensorTemperatura = true;
    }
})

router.post('/gaugeHum', async (req, res) =>{
    if (EstadoSensorHumedad){
        EstadoSensorHumedad = false;
    }else {
        EstadoSensorHumedad = true;
    }
})

router.post('/gaugeViento', async (req, res) =>{
    if (EstadoSensorViento){
        EstadoSensorViento = false;
    }else {
        EstadoSensorViento = true;
    }
})

module.exports =router;