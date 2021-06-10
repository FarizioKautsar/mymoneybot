var { Telegraf, sessi } = require('telegraf')

// Insert Telegram bot Token here
var bot = new Telegraf('1883678744:AAHl333qKEXRQNCXe4qjrpaHu1YLKJubvGM');

var start = true
var critic = false
var name = ''

// Main welcoming message (/start)
var welcomeMessage = `
Halo! Selamat datang di MyMoney. 
Dengan siapa kami chattan?
`

// Main menu
var menuMessage = (newName) => {
    name = newName
    console.log(newName)
    return `Hai ${name}, Ada yang bisa dibantu?`
}

var mainMenuInline = {
    inline_keyboard: [
        [
            { text: 'Tentang MyMoney', callback_data: 'tentang' }
        ],
        [
            { text: 'Fitur MyMoney', callback_data: 'mitra' }
        ],
        [
            { text: 'Kendala MyMoney', callback_data: 'keluar' }
        ],
    ]
}

// Starting reply (/start)
var startFuncion = ctx => {
    start = true
    critic = false
    ctx.reply(welcomeMessage)
}

bot.start(startFuncion)
bot.action('start', startFuncion)

var menuFunction = ctx => {
    critic = false
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: mainMenuInline
    })
}

bot.command('menu', menuFunction)
bot.action('menu', menuFunction)

// Konsultasi menu (/konsultasi)
var tentangMessage = `
MyMoney adalah startup yang menyediakan atau memfasilitasi penggunanya dengan fitur-fitur seperti (M)on(E)y, E-Payment, dan juga Chatbot.
`

var tentangFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, tentangMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Kembali', callback_data: 'menu' }
                ],
            ]
        }
    })
}

bot.command('tentang', tentangFunction)
bot.action('tentang', tentangFunction)

// Daftar sebagai konsultan
var mitraMessage = `
MyMoney bekerja sama dengan Univesitas Indonesia, Vokasi Universitas Indonesia dan OJK.
`

var mitraFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, mitraMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Kembali', callback_data: 'menu' }
                ],
            ]
        }
    })
}

bot.command('mitra', mitraFunction)
bot.action('mitra', mitraFunction)

// Responses to greetings
var greetingsMessage = `
Halo! Selamat datang di MyMoney. 
Ada yang dapat MyMoney bantu?

Silahkan pilih informasi yang Anda butuhkan.
`

bot.hears((/hai|hi|hello|woi|halo|hei|woey|hey/i), ctx => {
    bot.telegram.sendMessage(ctx.chat.id, greetingsMessage, {
        reply_markup: mainMenuInline
    })
})

// If user wants to quit, they are required to give critiques and suggestions
var keluarMessage = `
Terima kasih sudah mengunjungi chatbot MyMoney. 
Silakan berikan kritik & saran Anda kepada kami agar lebih baik.
`

var keluarFunction = ctx => {
    critic = true
    bot.telegram.sendMessage(ctx.chat.id, keluarMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Lewati', callback_data: 'finish' }
                ],
                [
                    { text: 'Kembali', callback_data: 'start' }
                ],
            ]
        }
    })
}

bot.action('keluar', keluarFunction)
bot.command('keluar', keluarFunction)

var restartInline = {
    inline_keyboard: [
        [
            { text: 'Mulai Kembali', callback_data: 'start' }
        ]
    ]
}

var finishMessage = `
Terima kasih sudah menggunakan MyMoney!
Jangan lupa jaga kesehatan, ya!

Sampai ketemu lagi :)
`
bot.action('finish', ctx => {
    ctx.reply(finishMessage, {
        reply_markup: restartInline
    })
})

// Error handler unknown command(s)
var errorMessage = `
Mohon maaf, kami tidak mengerti perintah Anda.
Silahkan pilih informasi yang Anda butuhkan.
`

var quitMessage = `
Terima kasih atas saran Anda!
Jangan lupa jaga kesehatan, ya!

Sampai ketemu lagi :)
`

bot.on('text', ctx => {
    if (start) {
        start = false
        bot.telegram.sendMessage(ctx.chat.id, menuMessage(ctx.message.text), {
            reply_markup: mainMenuInline
        })
    }
    else {
        if (critic) {
            critic = false
            ctx.reply(quitMessage, {
                reply_markup: restartInline
            })
        }
        else {
            bot.telegram.sendMessage(ctx.chat.id, errorMessage, {
                reply_markup: mainMenuInline
            })
        }
    }
})

bot.launch()
console.log('Bot Launched!')

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))