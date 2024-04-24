const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['', 'gracias', '.'])
    .addAnswer(['De nada, espero haberte ayudado, si deseas volver a ver las opciones del inicio, escribe "volver"']);
        
const flowCatalogo = addKeyword(['link', 'catalogo', 'catálogo'])
    .addAnswer(
        [
            '📄 Aquí encontrarás nuestro catálogo virtual'],)
    .addAnswer(
        [
            'https://caleesperu.com/shop/'
    
        ],
        null,
        null,
        [flowSecundario]
    );


const flowPedir = addKeyword(['pedido', 'pedir'])
    .addAnswer(
        [
            'Bien, por lo que veo ya sabes que necesitas...'])
    .addAnswer(
        [
            'Por favor, enviame fotos de los productos que deseas adquirir'])
    .addAnswer(
        [ 'Te conectaré con el encargado'],
        null,
        null,
        [flowSecundario]
    );


const flowPrincipal = addKeyword(['hola', 'ole', 'volver', 'alo', 'buenos días', 'buenas noches', 'buenas tardes', 'que tal', 'que onda', 'gracias','0'])
    .addAnswer('🙌 Hola bienvenido a *CALEES* 🙌')
    .addAnswer(
        [
            'Te puedo ayudar de la siguiente manera, escribe:',
            '👉 *Link*, para ver y descargar el catálogo actualizado',
            '👉 *Pedido*, si ya conoces que prendas deseas comprar y quieres realizar un pedido ',
        ],
        null,
        null,
        [flowCatalogo, flowConsulta, flowPedir, flowInfo]
    );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
