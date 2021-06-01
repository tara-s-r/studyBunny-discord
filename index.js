const token_file = require("./auth.json")
const Discord = require("discord.js")
const client = new Discord.Client()

// to let me know the bot has booted up
client.once("ready", () => {
  console.log(`${client.user.tag} has logged in!`)
})

client.on("message", msg => {
  // check if a message has been sent by a user starting with '^' and remove it to process easier
  if (!msg.author.bot && msg.content.charAt(0) == '^') {
    msg.content = msg.content.substring(1)
    // task 1: set up a study session (study time/break time/# of sessions),
    // pings you each session end and start
    if (msg.content.startsWith("sesh")) {
      msg.channel.send("the createdTimestamp function: " + msg.createdTimestamp)
      // every 60,000 units, a minute passes
      // now create a function that throttles when to send a message (outside of this if statement)
      // and have it send the message that the time is up and ping the person
      // do it after 1 minute to test and then have it be custom based on the user
      // also try and see if you can change it to be after a few seconds
    } else {
      msg.channel.send("oops!")
    }
  }
})

client.login(token_file.token)