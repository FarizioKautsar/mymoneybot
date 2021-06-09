var {Telegraf} = require('telegraf')

// Insert Telegram bot Token here
var bot = new Telegraf('1883678744:AAHl333qKEXRQNCXe4qjrpaHu1YLKJubvGM');

var critic = false

// Main welcoming message (/start)
var welcomeMessage = `
Halo! Selamat datang di MyMoney. 
Ada yang dapat MyMoney bantu?
`

// Main menu
var menuMessage = `
Silahkan pilih informasi yang Anda butuhkan.

Ketik:
/tentang - Informasi mengenai MyMoney
/mitra - Informasi mengenai mitra MyMoney

Atau Anda bisa memilih dari tombol dibawah ini.
`

var mainMenuInline = {
    inline_keyboard: [
        [
            {text: 'Tentang Kami', callback_data: 'tentang'}
        ],
        [
            {text: 'Mitra Kami', callback_data: 'mitra'}
        ],
    ]
}

// Starting reply (/start)
bot.start(ctx => {
    bot.telegram.sendMessage(ctx.chat.id, welcomeMessage, {
        reply_markup: mainMenuInline
    })
})

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
MyMoney adalah startup blabla

/menu - Kembali ke menu utama
`

var konsultasiFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, tentangMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'menu'}
                ],
            ]
        }
    })
}

bot.command('konsultasi', konsultasiFunction)
bot.action('konsultasi', konsultasiFunction)

// Daftar sebagai konsultan
var mitraMessage = `
MyMoney bekerja sama dengan 

/menu - Kembali ke menu utama
`

var mitraFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, mitraMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'menu'}
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

Ketik:
/tentang - Informasi mengenai MyMoney
/mitra - Informasi mengenai mitra MyMoney

Atau Anda bisa memilih dari tombol dibawah ini.
`

bot.hears((/hai|hi|hello|woi|halo|hei|woey|hey/i), ctx => {
    bot.telegram.sendMessage(ctx.chat.id, greetingsMessage, {
        reply_markup: mainMenuInline
    })
})

// If user wants to quit, they are required to give critiques and suggestions
var critiqueMessage = `
Terima kasih sudah mengunjungi chatbot MyMoney. 
Silakan berikan kritik & saran Anda kepada kami agar lebih baik.
`

bot.command('quit', ctx => {
    critic = true
    ctx.reply(critiqueMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'menu'}
                ],
            ]
        }
    })
})

// Error handler unknown command(s)
var errorMessage = `
Mohon maaf, kami tidak mengerti perintah Anda.
Silahkan pilih informasi yang Anda butuhkan.

Ketik:
/tentang - Informasi mengenai MyMoney
/mitra - Informasi mengenai mitra MyMoney

Atau Anda bisa memilih dari tombol dibawah ini.
`

var quitMessage = `
Terima kasih atas saran Anda!
Jangan lupa jaga kesehatan, ya!

Sampai ketemu lagi :)
`
bot.on('text', ctx => {
    if (critic) {
        ctx.reply(quitMessage)
        ctx.leaveChat()
    }
    else {
        bot.telegram.sendMessage(ctx.chat.id, errorMessage, {
            reply_markup: mainMenuInline
        })
    }
})

console.log('Bot Launched!')