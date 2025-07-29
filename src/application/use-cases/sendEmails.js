const { enviarCorreoEmpresa, enviarCorreoCliente } = require('../../infrastructure/services/mailService');

const sendEmails = async (datos) => {
  await enviarCorreoEmpresa(datos);
  await enviarCorreoCliente(datos);
};

module.exports = { sendEmails };
