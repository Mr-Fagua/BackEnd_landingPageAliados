const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');

let sock;

const connectToWhatsApp = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    sock = makeWASocket({
        auth: state
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
            console.log('Conexión cerrada debido a', lastDisconnect?.error, ', reconectando:', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            console.log('✅ Conexión abierta con WhatsApp');
        } else if (qr) {
            qrcode.generate(qr, { small: true });
            console.log('📲 Escanea el código QR para conectar tu cuenta de WhatsApp.');
        }
    });

    sock.ev.on('creds.update', saveCreds);
};

const sendMessage = async (numero, mensaje) => {
    if (!sock) {
        throw new Error('❌ WhatsApp no está conectado');
    }

    // Limpiar el número: quitar caracteres no numéricos
    const formattedNumber = numero.replace(/\D/g, '');
    const fullNumber = formattedNumber.startsWith('57') ? formattedNumber : `57${formattedNumber}`;
    const id = `${fullNumber}@s.whatsapp.net`;

    try {
        await sock.sendMessage(id, { text: mensaje }, { timeoutMs: 60000 });
        console.log(`✅ Mensaje enviado a ${fullNumber}: ${mensaje}`);
    } catch (error) {
        console.error(`❌ Error al enviar mensaje a ${fullNumber}:`, error);
    }
};

module.exports = { connectToWhatsApp, sendMessage };
