var CronJob = require('cron').CronJob;
const conn = require('./dbconfig');


var job = new CronJob('* * * * * *', function() {
    verificarEstadoLuces();
}, null, true, 'America/Los_Angeles');
job.start();


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
            }else{
                console.log('Apagado');
            }
        }else{
            if(((h_DB_ON < h) || ((h_DB_ON == h) && (m_DB_ON < m))) && ((h < h_DB_OFF) || ((h_DB_OFF == h) && (m_DB_OFF > m)))){
                //Encender luces
                console.log('Encendido');
            }else{
                console.log('Apagado');
            }
        }
}