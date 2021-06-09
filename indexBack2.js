var {Telegraf} = require('telegraf')
const TelegrafStatelessQuestion = require('telegraf-stateless-question');
// Insert Telegram bot Token here
var bot = new Telegraf('1883678744:AAHl333qKEXRQNCXe4qjrpaHu1YLKJubvGM');
// var session = require('telegraf/session');
var nameState = new TelegrafStatelessQuestion('name', ctx => {
    console.log('Nama', ctx.message.text)
})
bot.use(nameState.middleware())
var start = true
var name = ''

// ============================ Starting messages ============================
var startMessage = `
Halo! Selamat datang di MyMoney. 
Dengan siapa kami chattan?
`

var mainMenuInline = {
    inline_keyboard: [
        [
            {text: 'Tentang MyMoney', callback_data: 'tentang'}
        ],
        [
            {text: 'Fitur MyMoney', callback_data: 'fitur'}
        ],
        [
            {text: 'Kendala MyMoney', callback_data: 'kendala'}
        ],
    ]
}

var startFunction = ctx => {
    ctx.reply(startMessage)
}

bot.start(startFunction)

var menuMessage = name => {
    return `Hai ${name}, ada yang bisa kami bantu?`
}

var errorMessage = `
Mohon maaf, kami tidak mengerti perintah Anda.
Silahkan pilih informasi yang Anda butuhkan.
`

bot.on('text', ctx => {
    if (start) {
        start = false
        console.log(ctx.session)
        ctx.session.name = ctx.message.text
        ctx.reply(menuMessage(ctx.session.name), {
            reply_markup: mainMenuInline
        })
    }
    else {
        ctx.reply(errorMessage, {
            reply_markup: mainMenuInline
        })
    }
})

var menuFunction = ctx => {
    ctx.reply(menuMessage(ctx.session.name), {
        reply_markup: mainMenuInline
    })
}

bot.action('menu', menuFunction)
bot.command('menu', menuFunction)

var backInline = {
    inline_keyboard: [
        [
            {text: 'Kembali', callback_data: 'menu'}
        ]
    ]
}

// ============================ Tentang MyMoney ============================
var tentangMessage = `
MyMoney merupakan website e-transaction baik sesama akun MyMoney, transfer ATM, pembayaran pulsa HP, pembayaran Listrik, dan pembayaran telp yang mudah dan aman.
`

var tentangFunction = ctx => {
    ctx.reply(tentangMessage, {
        reply_markup: backInline
    })
}

bot.action('tentang', tentangFunction)
bot.command('tentang', tentangFunction)

bot.launch()