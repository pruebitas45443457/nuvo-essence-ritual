/**
 * Import function triggers from their respective submodules:
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onDocumentCreated, onDocumentUpdated} = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// URL del logo para usar en los correos (reemplaza con la URL real una vez desplegado)
const LOGO_URL = "https://prueba-blaze.web.app/logo.png"; // Asumiendo que tu proyecto se llama prueba-blaze

// Configuración de correo
const mailTransport = nodemailer.createTransport({
  service: 'gmail',  // Puedes usar otro servicio como 'sendgrid', 'mailgun', etc.
  auth: {
    user: 'j24291972@gmail.com',
    pass: 'ufxx grvv atvb jued'  // Reemplaza esto con la App Password que generaste en Google
  }
});

// Mapeo de servicios para el correo
const serviceNames = {
  'cata-intima': 'Cata Íntima (45 min)',
  'cata-pareja': 'Cata de Pareja (60 min)',
  'cata-grupal': 'Cata Grupal (90 min)',
  'consulta-productos': 'Consulta de Productos (30 min)',
  'compra-perfumes': 'Compra Personalizada (60 min)'
};

// Función para enviar correo de confirmación cuando se crea una nueva cita
exports.sendAppointmentConfirmation = onDocumentCreated('appointments/{appointmentId}', async (event) => {
  const snapshot = event.data;
  if (!snapshot) {
    logger.log('No data associated with the event');
    return;
  }
  
  const appointmentData = snapshot.data();
  const { email, name, date, time, service } = appointmentData;
    
    const mailOptions = {
      from: '"NUVÓ Essence Ritual" <noreply@nuvoessence.com>',
      to: email,
      subject: 'Confirmación de Reserva - NUVÓ Essence Ritual',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E7DCD1; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="${LOGO_URL}" alt="NUVÓ Essence Ritual" style="max-width: 150px; margin-bottom: 10px;" />
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
      
      // Actualizar el documento para indicar que se envió el correo
      try {
        const appointmentId = event.params.appointmentId;
        const appointmentRef = admin.firestore().collection('appointments').doc(appointmentId);
        await appointmentRef.update({
          emailSent: true,
          emailSentAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } catch (error) {
        logger.error('Error al actualizar el documento:', error);
      }
      
      return null;
    } catch (error) {
      logger.error('Error al enviar el correo de confirmación:', error);
      return null;
    }
});

// Función para enviar correo cuando el estado de la cita cambia a confirmada
exports.sendAppointmentStatusUpdate = onDocumentUpdated('appointments/{appointmentId}', async (event) => {
  const beforeSnapshot = event.data.before;
  const afterSnapshot = event.data.after;
  
  if (!beforeSnapshot || !afterSnapshot) {
    logger.log('No data associated with the event');
    return;
  }
  
  const before = beforeSnapshot.data();
  const after = afterSnapshot.data();
  
  // Solo proceder si el estado cambió a 'confirmed'
  if (before.status !== 'confirmed' && after.status === 'confirmed') {
      const { email, name, date, time, service } = after;
      
      const mailOptions = {
        from: '"NUVÓ Essence Ritual" <noreply@nuvoessence.com>',
        to: email,
        subject: 'Cita Confirmada - NUVÓ Essence Ritual',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E7DCD1; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="${LOGO_URL}" alt="NUVÓ Essence Ritual" style="max-width: 150px; margin-bottom: 10px;" />
            </div>
            
            <div style="background-color: #FAF9F6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #C2A59D; margin-top: 0;">¡Buenas noticias, ${name}!</h2>
              <p style="color: #1C1C1C; line-height: 1.5;">Tu cita ha sido <strong style="color: #C2A59D;">CONFIRMADA</strong>. Te esperamos:</p>
              
              <div style="margin: 20px 0; padding: 15px; background-color: #E7DCD1; border-radius: 8px;">
                <p style="margin: 5px 0;"><strong>Servicio:</strong> ${serviceNames[service] || service}</p>
                <p style="margin: 5px 0;"><strong>Fecha:</strong> ${date}</p>
                <p style="margin: 5px 0;"><strong>Hora:</strong> ${time}</p>
                <p style="margin: 5px 0;"><strong>Dirección:</strong> Av. Siempreviva 742, Buenos Aires</p>
              </div>
              
              <p style="color: #1C1C1C; line-height: 1.5;">Por favor, llega 10 minutos antes para una mejor experiencia. Te recordamos evitar usar perfumes el día de tu visita.</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E7DCD1;">
              <p style="color: #1C1C1C; font-size: 14px;">Si necesitas modificar o cancelar tu cita, por favor contáctanos a <a href="mailto:contacto@nuvoessence.com" style="color: #C2A59D;">contacto@nuvoessence.com</a></p>
              <p style="color: #1C1C1C; font-size: 12px; margin-top: 20px;">© 2025 NUVÓ Essence Ritual. Todos los derechos reservados.</p>
            </div>
          </div>
        `
      };
      
      try {
        await mailTransport.sendMail(mailOptions);
        logger.log('Correo de confirmación de estado enviado a:', email);
        return null;
      } catch (error) {
        logger.error('Error al enviar el correo de confirmación de estado:', error);
        return null;
      }
    }
    
    return null;
  });

// Import setGlobalOptions from the correct location
const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
