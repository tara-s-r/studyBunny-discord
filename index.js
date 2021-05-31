const token_file = require("./auth.json")
const Discord = require("discord.js")
const client = new Discord.Client()

// to let me know the bot has booted up
client.once("ready", () => {
  console.log(`${client.user.tag} has logged in!`)
})

// just the basic ping-pong message and reply but requires the '^' character to respond
client.on("message", msg => {
  if (!msg.author.bot && msg.content.charAt(0) == '^') {
    msg.content = msg.content.substring(1)
    if (msg.content === "ping") {
      msg.channel.send("pong")
    } else {
      msg.channel.send("Send \'ping\'!")
    }
  }
})

client.login(token_file.token)