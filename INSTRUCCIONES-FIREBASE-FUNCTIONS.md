# Guía de implementación de Firebase Cloud Functions para correos de confirmación

Esta guía te muestra cómo implementar la función de Firebase para enviar correos de confirmación automáticamente cuando se crea una nueva cita.

## Requisitos previos

1. Firebase CLI instalado: `npm install -g firebase-tools`
2. Proyecto Firebase configurado con Firestore y Authentication
3. Plan Blaze (de pago) en Firebase (necesario para Cloud Functions con acceso externo)

## Pasos para implementar la función

### 1. Inicializar Firebase Functions en tu proyecto

```bash
firebase login
cd tu-proyecto-nuvo
firebase init functions
```

Selecciona JavaScript o TypeScript según prefieras.

### 2. Instalar dependencias

```bash
cd functions
npm install nodemailer
```

### 3. Implementar la función

Abre el archivo `functions/index.js` (o `index.ts` para TypeScript) y agrega el siguiente código:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configuración de correo
const mailTransport = nodemailer.createTransport({
  service: 'gmail',  // Puedes usar otro servicio como 'sendgrid', 'mailgun', etc.
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-contraseña-o-app-password'  // Si usas Gmail, debes generar una "App Password"
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
exports.sendAppointmentConfirmation = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate(async (snapshot, context) => {
    const appointmentData = snapshot.data();
    const { email, name, date, time, service } = appointmentData;
    
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
      
      // Actualizar el documento para indicar que se envió el correo
      const appointmentRef = admin.firestore().collection('appointments').doc(context.params.appointmentId);
      await appointmentRef.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return null;
    } catch (error) {
      console.error('Error al enviar el correo de confirmación:', error);
      return null;
    }
  });

// Función para enviar correo cuando el estado de la cita cambia a confirmada
exports.sendAppointmentStatusUpdate = functions.firestore
  .document('appointments/{appointmentId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    
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
              <h1 style="color: #C2A59D; margin: 0;">NUVÓ</h1>
              <p style="color: #1C1C1C; font-size: 18px;">Essence Ritual</p>
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
        console.log('Correo de confirmación de estado enviado a:', email);
        return null;
      } catch (error) {
        console.error('Error al enviar el correo de confirmación de estado:', error);
        return null;
      }
    }
    
    return null;
  });
```

### 4. Configurar variables de entorno (Opcional pero recomendado)

Para no exponer tus credenciales de correo en el código, puedes usar variables de entorno:

```bash
firebase functions:config:set mail.user="tu-email@gmail.com" mail.pass="tu-contraseña-o-app-password"
```

Y luego modificar el código para usar estas variables:

```javascript
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().mail.user,
    pass: functions.config().mail.pass
  }
});
```

### 5. Implementar las funciones

```bash
firebase deploy --only functions
```

## Notas importantes

1. **Seguridad**: Si usas Gmail, necesitarás generar una "App Password" en la configuración de tu cuenta de Google, ya que el inicio de sesión normal no funcionará.

2. **Costos**: Las Cloud Functions y el envío de correos pueden generar costos en Firebase. Revisa el plan Blaze y sus precios.

3. **Reglas de Firestore**: Asegúrate de que tus reglas de seguridad permitan que las funciones accedan a los documentos necesarios.

4. **Pruebas**: Puedes probar las funciones localmente antes de implementarlas con `firebase emulators:start`.

5. **Personalización**: Modifica las plantillas HTML de los correos según tus necesidades de diseño y marca.

## Soporte

Si tienes problemas con la implementación, consulta la [documentación oficial de Firebase Cloud Functions](https://firebase.google.com/docs/functions) o contacta a un desarrollador especializado en Firebase.
