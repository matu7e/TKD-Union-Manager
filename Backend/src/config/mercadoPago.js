const { MercadoPagoConfig} = require('mercadopago');

// Configura tus credenciales de acceso
const mercadoPago = new MercadoPagoConfig({accessToken: 'APP_USR-3919051890205950-112110-7f3f2e6e1047a4bb354aacc0875d0109-2108970409'});

module.exports = mercadoPago;