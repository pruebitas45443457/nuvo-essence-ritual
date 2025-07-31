// Este archivo contiene las Cloud Functions de Firebase para enviar correos
// de confirmación y otras tareas automatizadas

// Ejemplo de implementación en Firebase Functions:
/*
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configuración de correo
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-contraseña-o-app-password'
  }
});

// Función para enviar correo de confirmación cuando se crea una nueva cita
exports.sendAppointmentConfirmation = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snapshot, context) => {
    const appointmentData = snapshot.data();
    const { email, name, date, time, service } = appointmentData;
    
    // Personaliza el servicio para el correo
    const serviceNames = {
      'cata-intima': 'Cata Íntima (45 min)',
      'cata-pareja': 'Cata de Pareja (60 min)',
      'cata-grupal': 'Cata Grupal (90 min)',
      'consulta-productos': 'Consulta de Productos (30 min)',
      'compra-perfumes': 'Compra Personalizada (60 min)'
    };
    
    const mailOptions = {
      from: '"NUVÓ Essence Ritual" <noreply@nuvoessence.com>',
      to: email,
      subject: 'Confirmación de Reserva - NUVÓ Essence Ritual',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E7DCD1; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #C2A59D; margin: 0;">NUVÓ</h1>
            <p style="color: #1C1C1C; font-size: 18px;">Essence Ritual</p>
          </div>
          
          <div style="background-color: #FAF9F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #C2A59D; margin-top: 0;">¡Hola ${name}!</h2>
            <p style="color: #1C1C1C; line-height: 1.5;">Tu reserva ha sido recibida y está pendiente de confirmación. A continuación, encontrarás los detalles de tu cita:</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #E7DCD1; border-radius: 8px;">
              <p style="margin: 5px 0;"><strong>Servicio:</strong> ${serviceNames[service] || service}</p>
              <p style="margin: 5px 0;"><strong>Fecha:</strong> ${date}</p>
              <p style="margin: 5px 0;"><strong>Hora:</strong> ${time}</p>
            </div>
            
            <p style="color: #1C1C1C; line-height: 1.5;">Uno de nuestros especialistas confirmará tu cita en las próximas 24 horas. Recibirás otro correo con la confirmación final.</p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E7DCD1;">
            <p style="color: #1C1C1C; font-size: 14px;">Si tienes alguna pregunta, por favor contáctanos a <a href="mailto:contacto@nuvoessence.com" style="color: #C2A59D;">contacto@nuvoessence.com</a></p>
            <p style="color: #1C1C1C; font-size: 12px; margin-top: 20px;">© 2025 NUVÓ Essence Ritual. Todos los derechos reservados.</p>
          </div>
        </div>
      `
    };
    
    try {
      await mailTransport.sendMail(mailOptions);
      console.log('Correo de confirmación enviado a:', email);
      return null;
    } catch (error) {
      console.error('Error al enviar el correo de confirmación:', error);
      return null;
    }
  });
*/
