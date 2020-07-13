const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendCriticalEmail = (email, tipo) => {
    sgMail.send({
        to: email,
        from: 'noreply.estacionmet@gmail.com',
        subject: 'Evento Critico detectado',
        text: `Se ha detectado niveles criticos para el sensor correspondiente a la ${tipo}`
    })
}

const sendGabineteAbiertoEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'noreply.estacionmet@gmail.com',
        subject: 'Gabinete Abierto',
        text: `Se ha detectado la apertura del gabinete.`
    })
}


module.exports = {
    sendCriticalEmail,
    sendGabineteAbiertoEmail
}