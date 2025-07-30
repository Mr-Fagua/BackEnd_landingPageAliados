const { sendEmails } = require("../../../application/use-cases/sendEmails");
const { sendMessage } = require("../../services/whatsappService"); // Importar el servicio de WhatsApp

const handleSendEmails = async (req, res) => {
  const datos = req.body;

  try {
    await sendEmails(datos);

    // Enviar mensaje de WhatsApp
    if (datos.telefono) {
      const mensaje = `¡Hola ${datos.nombre}! 👋

        Gracias por confiar en *Aliados Express* 🚚✨

        Hemos recibido tu solicitud de cotización para un envío desde *${datos.direccionRecogida}* hasta *${datos.direccionEntrega}*. Nuestro equipo ya está revisando los detalles para ofrecerte la mejor solución logística, segura y puntual 💼📦

        Muy pronto uno de nuestros asesores se comunicará contigo para brindarte atención personalizada y resolver cualquier duda que tengas.

        En *Aliados Express*, tu envío está en buenas manos ⚡`;

      await sendMessage(datos.telefono, mensaje);
    }

    res
      .status(200)
      .json({
        message: "Correos enviados correctamente y mensaje de WhatsApp enviado",
      });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};

module.exports = { handleSendEmails };
