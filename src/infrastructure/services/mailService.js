const nodemailer = require('nodemailer');

const enviarCorreoEmpresa = async (datos) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'Nueva cotización recibida',
    html: `
      <h1>Nueva Cotización Recibida</h1>
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Teléfono:</strong> ${datos.telefono}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Tipo de Envío:</strong> ${datos.tipoEnvio}</p>
      <p><strong>Ciudad:</strong> ${datos.ciudad}</p>
      <p><strong>Dirección de Recogida:</strong> ${datos.direccionRecogida}</p>
      <p><strong>Dirección de Entrega:</strong> ${datos.direccionEntrega}</p>
      <p><strong>Peso:</strong> ${datos.peso}</p>
      <p><strong>Dimensiones:</strong> ${datos.largo} x ${datos.ancho} x ${datos.alto} cm</p>
      <p><strong>Observaciones:</strong> ${datos.observaciones}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const enviarCorreoCliente = async (datos) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: datos.email,
    subject: 'Gracias por tu solicitud de cotización',
    html: `
      <h1>¡Gracias por tu solicitud, ${datos.nombre}!</h1>
      <p>Hemos recibido tu solicitud de cotización con los siguientes detalles:</p>
      <ul>
        <li><strong>Teléfono:</strong> ${datos.telefono}</li>
        <li><strong>Tipo de Envío:</strong> ${datos.tipoEnvio}</li>
        <li><strong>Ciudad:</strong> ${datos.ciudad}</li>
        <li><strong>Dirección de Recogida:</strong> ${datos.direccionRecogida}</li>
        <li><strong>Dirección de Entrega:</strong> ${datos.direccionEntrega}</li>
        <li><strong>Peso:</strong> ${datos.peso}</li>
        <li><strong>Dimensiones:</strong> ${datos.largo} x ${datos.ancho} x ${datos.alto} cm</li>
        <li><strong>Observaciones:</strong> ${datos.observaciones}</li>
      </ul>
      <p>Nos pondremos en contacto contigo pronto para confirmar los detalles.</p>
      <p>¡Gracias por confiar en nosotros!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { enviarCorreoEmpresa, enviarCorreoCliente };
