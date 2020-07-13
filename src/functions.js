const conn = require('./dbconfig');
const mail_func = require('./emails/mailSender');

const func = async function controlarCritico(medida){
    //conn.connect();
    
    const result = await conn.query('SELECT valor_transferencia_A, valor_transferencia_B, valor_transferencia_C, critico_min, critico_max, modelo, nombre, email_notificacion FROM sensor JOIN configuracion WHERE id_sensor=2');
    
    var resultado_critico = "Valor no critico";
    if ((medida >= result[0].critico_min) && (medida <= result[0].critico_max)){
        resultado_critico = "VALOR CRITICO ALCANZADO";
        
        const result_id = await conn.query('SELECT MAX(id_evento) from evento');
        tipo_evento = "Evento Critico";
        descripcion = "El sensor "+result[0].nombre+", de modelo: "+result[0].modelo+" ha alcanzado valores criticos. Lectura de de:"+medida+"";
        id_evento = result_id[0]['MAX(id_evento)'] +1;
        date = new Date().toLocaleString();
        const result_evento = await conn.query('INSERT INTO evento (id_evento, fecha_y_hora, descripcion, tipo_evento) VALUES ('+id_evento+', "'+date+'", "'+descripcion+'", "'+tipo_evento+'")');
        
        mail_func.sendCriticalEmail(result[0].email_notificacion, result[0].nombre);


    }
    //conn.end();
    return resultado_critico;
}
module.exports.func = func;