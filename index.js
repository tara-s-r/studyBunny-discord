const token_file = require("./auth.json")
const Discord = require("discord.js")
const client = new Discord.Client()

// to let me know the bot has booted up
client.once("ready", () => {
	console.log(`${client.user.tag} has logged in!`)
})

// ^sesh 60/5/2 studying

// task 1: set up a study session (study time/break time/# of sessions),
// pings you each session end and start
client.on("message", msg => {
	// check if a message has been sent by a user starting with '^' and remove it to process easier
	if (!msg.author.bot && msg.content.charAt(0) == '^') {
		msg.content = msg.content.substring(1)
		if (msg.content.startsWith("sesh")) {
			// remove "sesh " from the message
			msg.content = msg.content.substring(5)
			// find function to parse strings based on spaces (like the hasNext Scanner function)
			// get the group of numbers, basically anything before the space
			
			// what if the user puts a space in between the numbers themselves?
			// maybe have the bot check the format and give an error if it doesn't fit
			let delay = 6
			setTimeout(() => msg.channel.send("session ended!"), 1 * 60 * 1000)
			// change to custom based on the user
		} else {
			msg.channel.send("oops!")
		}
	}
})

client.login(token_file.token)