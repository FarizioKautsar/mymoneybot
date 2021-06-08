var {Telegraf} = require('telegraf')

// Insert Telegram bot Token here
var bot = new Telegraf('1883678744:AAHl333qKEXRQNCXe4qjrpaHu1YLKJubvGM');

// Main welcoming message (/start)
var welcomeMessage = `
Halo! Selamat datang di MyMoney. 
Ada yang dapat MyMoney bantu?
`

// Main menu
var menuMessage = `
Silahkan pilih informasi yang Anda butuhkan.

/konsultasi - Jika ingin mengetahui hal-hal mengenai konsultasi kami
/daftar - Jika ingin mendaftar menjadi konsultan kami

Atau Anda bisa memilih dari menu dibawah ini.
`

var mainMenuInline = {
    inline_keyboard: [
        [
            {text: 'Informasi Konsultasi', callback_data: 'konsultasi'}
        ],
        [
            {text: 'Daftar Sebagai Konsultan', callback_data: 'daftar'}
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
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: mainMenuInline
    })
}

bot.command('menu', menuFunction)
bot.action('menu', menuFunction)

// Konsultasi menu (/konsultasi)
var konsultasiMessage = `
Apa yang Anda ingin ketahui mengenai konsultasi kami?

/durasi - Informasi mengenai durasi konsultasi kami
/topik - Informasi mengenai topik-topik konsultasi kami

/menu - Kembali ke menu utama
`

var konsultasiFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, konsultasiMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Durasi Konsultasi', callback_data: 'durasi'}
                ],
                [
                    {text: 'Topik Konsultasi', callback_data: 'topik'}
                ],
                [
                    {text: 'Kembali', callback_data: 'menu'}
                ],
            ]
        }
    })
}

bot.command('konsultasi', konsultasiFunction)
bot.action('konsultasi', konsultasiFunction)

// Konsultasi -> Durasi Konsultasi (/durasi)
var durasiKonsultasiMessage = `
Anda akan menerima sesi konsultasi selama X jam setelah pembayaran.

/menu - Kembali ke menu utama
`

var durasiKonsultasiFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, durasiKonsultasiMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'konsultasi'},
                    {text: 'Menu Utama', callback_data: 'menu'},
                ],
            ]
        }
    })
}

bot.command('durasi', durasiKonsultasiFunction)
bot.action('durasi', durasiKonsultasiFunction)

// Konsultasi -> Topik Konsultasi (/topik)
var topikKonsultasiMessage = `
Mengembangkan bisnis

/menu - Kembali ke menu utama
`

var topikKonsultasiFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, topikKonsultasiMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'konsultasi'},
                    {text: 'Menu Utama', callback_data: 'menu'},
                ],
            ]
        }
    })
}

bot.command('topik', topikKonsultasiFunction)
bot.action('topik', topikKonsultasiFunction)

// Daftar sebagai konsultan
var daftarKonsultanMessage = `
Langkah untuk mendaftar menjadi konsultan kami:
1. Kunjungi website kami http://konsulyuk.herokuapp.com/
2. User membuat akun dengan cara memasukkan data diri melalui formulir yang tersedia di dalam aplikasi/website. User memasukkan detail mengenai kriteria masalah bisnis yang akan di konsultasikan.  
3. User memilih konsultan.
4. Diproses terlebih dahulu dan dicarikan referensi yang sesuai dengan masalah bisnis user.  
5. Penyelesaian transaksi user menyelesaikan transaksi dengan sistem pembayaran yang telah dipilih sebelumnya. Selanjutnya, user akan berkomunikasi dengan konsultan yang tersedia jika sesuai baru menyelesaikan transaksi.
6. Ada juga fitur artikel dimana terdapat dari referensi-referensi terkait bisnis yang dapat membantu dalam konsultasi bisnis.

/menu - Kembali ke menu utama
`

var daftarKonsultanFunction = ctx => {
    bot.telegram.sendMessage(ctx.chat.id, daftarKonsultanMessage, {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: 'Kembali', callback_data: 'menu'}
                ],
            ]
        }
    })
}

bot.command('daftar', daftarKonsultanFunction)
bot.action('daftar', daftarKonsultanFunction)

// Responses to greetings
var greetingsMessage = `
Hello :). Ada pertanyaan tentang Konsul Yuk?
Silahkan tanyakan informasi yang diperlukan dari pilihan dibawah.

/konsultasi - Jika ingin mengetahui hal-hal mengenai konsultasi kami
/daftar - Jika ingin mendaftar menjadi konsultan kami

Atau Anda bisa memilih dari menu dibawah ini.
Selamat mencoba!
`

bot.hears((/hai|hi|hello|woi|halo|hei|woey|hey/i), ctx => {
    bot.telegram.sendMessage(ctx.chat.id, greetingsMessage, {
        reply_markup: mainMenuInline
    })
})

// Error handler unknown command(s)
var errorMessage = `
Mohon maaf, saya tidak mengerti perintah Anda.
Silahkan masukkan perintah berdasarkan informasi yang Anda butuhkan.

/konsultasi - Jika ingin mengetahui hal-hal mengenai konsultasi kami
/daftar - Jika ingin mendaftar menjadi konsultan kami

Atau Anda bisa memilih dari menu dibawah ini.
`

var critic = false
bot.hears('kritik', ctx => {
    critic = !critic
    ctx.reply('Mo ngomong apa')
})


bot.on('text', ctx => {
    if (critic) {
        critic = !critic
        ctx.reply('anjing')
    }
    else {
        bot.telegram.sendMessage(ctx.chat.id, errorMessage, {
            reply_markup: mainMenuInline
        })
    }
})

bot.launch();
console.log('Bot Launched!')