const token_file = require("./auth.json")
const Discord = require("discord.js")
const client = new Discord.Client()

// to let me know the bot has booted up
client.once("ready", () => {
	console.log(`${client.user.tag} has logged in!`)
})

// ^sesh studying

// task 1: set up a study session (study time/break time/# of sessions),
// pings you each session end and start
client.on("message", msg => {
	// check if a message has been sent by a user starting with '^'
	if (!msg.author.bot && msg.content.charAt(0) == '^') {
		if (msg.content.substring(1, 5) === "sesh") {
			// maybe try to do a reaction-type input, where studying/break time is given in 5s
			// and you can click the next page to get a longer study time
			// if they take too long to input, give an "operation expired" message & reset
			const headerLen = 6
			// get the topic of the session
			topic = msg.content.substring(headerLen)
			// do the reactions and stuff
			msg.channel.send(`This is just a check, is <@${client.user.id}> able to work as a ping?`)
			reactions(intro(msg.channel), msg.channel)
			// runSessions();
		} else {
			msg.channel.send("oops!")
		}
	}
})

let intro = () => {
	// split up the text to make it more readable here
	const intro_1 = "How long is each session? Select the reaction to that number divided by 5, "
	const intro_2 = "for example if each session is 50 minutes, react to the `10` emoji on the next message."
	return intro_1 + intro_2
}

let reactions = async (botMes, chan) => {
	try {
        let mes = await chan.send(botMes)
		await mes.react("1️⃣")
		await mes.react("2️⃣")
		await mes.react("3️⃣")
		await mes.react("4️⃣")
		await mes.react("5️⃣")
		await mes.react("6️⃣")
		await mes.react("7️⃣")
		await mes.react("8️⃣")
		await mes.react("9️⃣")
		await mes.react("🔟")
		// await mes.react("▶️")
		// consider making an array of these and using a loop along with >/< keys for pages
	} catch(error) {
		console.log(error)
	}
}

client.login(token_file.token)
// chan.send(intro_1 + intro_2).then(botIntro => {
// 	botIntro.react('1️⃣')
// 	botIntro.react('🌟')
// 	.catch(error => console.error('hmm, that didn\'t work the way we wanted', error));
// })