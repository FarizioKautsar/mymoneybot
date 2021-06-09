var {Telegraf} = require('telegraf')
const TelegrafStatelessQuestion = require('telegraf-stateless-question');

var bot = new Telegraf('1883678744:AAHl333qKEXRQNCXe4qjrpaHu1YLKJubvGM');

const unicornQuestion = new TelegrafStatelessQuestion('unicorns', ctx => {
	console.log('User thinks unicorns are doing:', ctx.message)
})

// Dont forget to use the middleware
bot.use(unicornQuestion.middleware())

bot.start(ctx => {
    ctx.reply('Hello')
})

bot.command('unicorn', async ctx => {
    console.log('hello')
	let text
	if (ctx.session.language === 'de') {
		text = 'Was machen Einhörner?'
	} else {
		text = 'What are unicorns doing?'
	}

	return unicornQuestion.replyWithMarkdown(ctx, text)
})