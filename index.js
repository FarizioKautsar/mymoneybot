var {Telegraf} = require('telegraf')
// Insert Telegram bot Token here
var bot = new Telegraf('1883678744:AAHl333qKEXRQNCXe4qjrpaHu1YLKJubvGM');
// var session = require('telegraf/session');

var start = true
var name = ''

// ============================ Starting messages ============================
var startMessage = name => {
    return  `Halo ${name}! Selamat datang di MyMoney. Ada yang bisa kami bantu?`
} 

var mainMenuInline = {
    inline_keyboard: [
        [
            {text: 'Tutorial Website', callback_data: 'tutorial'}
        ],
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
    console.log(ctx.message)
    ctx.reply(startMessage(ctx.message.from.first_name), {
        reply_markup: mainMenuInline
    })
}

bot.start(startFunction)

var menuMessage = name => {
    if (name) {
        return `Hai ${name}, ada yang bisa kami bantu?`
    } else {
        return `Hai! Ada yang bisa kami bantu?`
    }
}

var errorMessage = `
Mohon maaf, kami tidak mengerti perintah Anda.
Silahkan pilih informasi yang Anda butuhkan.
`

bot.on('text', ctx => {
    if (start) {
        start = false
        ctx.reply(menuMessage(ctx.message.from.first_name), {
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
    // console.log(ctx.message)
    ctx.reply(menuMessage(null), {
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

// ============================ Tutorial Website ============================
var tutorialMessage = `
1. Membuat akun dengan menekan tombol LOGIN, kemudian slide halaman ke bawah
2. Isi data sesuai dengan yang dibutuhkan di Website
3. Data sudah terdaftar, kemudia login username dan password
4. Website sudah bisa digunakan☺️
`

var tutorialFunction = ctx => {
    ctx.reply(tutorialMessage, {
        reply_markup: backInline
    })
}

bot.action('tutorial', tutorialFunction)
bot.command('tutorial', tutorialFunction)

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


// ============================ Fitur MyMoney ============================
var fiturMessage = `
Fitur MyMoney adalah sebagai berikut:
`

var fiturFunction = ctx => {
    ctx.reply(fiturMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'E-Payment', callback_data: 'epayment'}
                ],
                [
                    {text: 'Personal-E', callback_data: 'personale'}
                ],
                [
                    {text: 'Kembali', callback_data: 'menu'}
                ]
            ]
        }
    })
}

bot.action('fitur', fiturFunction)
bot.command('fitur', fiturFunction)


// ============================ Fitur -> E-Payment ============================
var epaymentMessage = `
E-Payment merupakan salah satu fitu kami, fitur ini dapat memudahkan para pengguna dalam melakukan transaksi antarakun, antar bank, dan dapat melakukan pembayaran.
`

var epaymentFunction = ctx => {
    ctx.reply(epaymentMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'fitur'}
                ]
            ]
        }
    })
}

bot.action('epayment', epaymentFunction)
bot.command('epayment', epaymentFunction)


// ============================ Fitur -> Personal-E ============================
var personaleMessage = `
Personal-E merupkan salah satu fitur MyMoney, fitur ini merupakan chatbot yang dapat membantu penggunanya dalam menggunakan atau pengoperasi Website MyMoney
`

var personaleFunction = ctx => {
    ctx.reply(personaleMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'fitur'}
                ]
            ]
        }
    })
}

bot.action('personale', personaleFunction)
bot.command('personale', personaleFunction)


// ============================ Kendala MyMoney ============================
var kendalaMessage = `
Anda bisa mengadukan kendala dengan mengirimkan email ke my.moneyyyy@gmail.com
`

var kendalaFunction = ctx => {
    ctx.reply(kendalaMessage, {
        reply_markup: backInline
    })
}

bot.action('kendala', kendalaFunction)
bot.command('kendala', kendalaFunction)

bot.launch()