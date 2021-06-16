const token_file = require("./auth.json")
const Discord = require("discord.js")
const client = new Discord.Client()

// to let me know the bot has booted up
client.once("ready", () => {
	console.log(`${client.user.tag} has entered the chatroom!`)
})

// ^sesh

// pings you each session end and start
client.on("message", msg => {
	// check if a message has been sent by a user starting with '^'
	if (!msg.author.bot && msg.content.charAt(0) == '^') {
		if (msg.content.substring(1, 5) === "sesh") {
			// do the reactions and stuff
			addReactions(msg.channel).then(() => getReaction(msg))
			// runSessions();
		} else {
			msg.channel.send("That doesn't seem to be a command for me.")
		}
	}
})

// sends a message telling the user about how studyBunny's sessions work
// and adds reactions to that message
const addReactions = async (botChannel) => {
	// I split up the text to make it more readable here
	let botMessage = "How long is each session? Select the reaction to that number divided by 5,"
					 + " for example if each session is 50 minutes, react to the `10` emoji on the"
					 + " next message."
	try {
        let initial = await botChannel.send(botMessage)
		await initial.react("1️⃣")
		await initial.react("2️⃣")
		await initial.react("3️⃣")
		await initial.react("4️⃣")
		await initial.react("5️⃣")
		await initial.react("6️⃣")
		await initial.react("7️⃣")
		await initial.react("8️⃣")
		await initial.react("9️⃣")
		await initial.react("🔟")
		return initial
		// consider making an array of these and using a loop along with >/< keys for pages
		// await mes.react("▶️")
	} catch(error) {
		console.log(error)
	}
}

// still needs work
function getReaction(message){
	const filter = (reaction, user) => {
		return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	
	message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
		.then(collected => {
			const reaction = collected.first();
			message.reply(`you reacted with a ${reaction}`);
		})
		.catch(collected => {
			message.reply('you reacted with nothing?');
		});
}

client.login(token_file.token)