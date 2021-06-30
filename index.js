const token_file = require("./auth.json");
const Discord = require("discord.js");
const client = new Discord.Client();
const reactionArray = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']

// to let me know the bot has booted up
client.once("ready", () => {
    console.log(`${client.user.tag} has entered the chatroom!`);
})

client.on('message', async message => {
    // read message as long as it's not from another bot
    if (!message.author.bot && message.content.startsWith("^")) {
        if (message.content.substring(1, 5) === "sesh") {
            newSession(message);
        }
    }
});

async function newSession(message) {
    // send info message
    let botMessageText = `<@${message.author.id}>, how long is each session? Select the `
    + "reaction to that number divided by 5, for example if each session is 50 minutes, react"
    + " to the `10` emoji on the next message."
    botMessage = await message.channel.send(botMessageText);
    
    // set up filter to start monitoring  reactions
    const filter = (reaction, user) => {
        return (reactionArray.includes(reaction.emoji.name) && user.id === message.author.id);
    }
    
    // wait 30 seconds for a response before ending
    let reactionWaitTime = 30;
    botMessage.awaitReactions(filter, {max: 1, time: reactionWaitTime * 1000, errors: ['time']})
    .then((collected) => {
        const reaction = collected.first();
        
        if (reactionArray.includes(reaction.emoji.name)) {
            // get the number the user selected (sessionLength)
            var sessionLength = reactionArray.indexOf(reaction.emoji.name) + 1;
            // wait sessionLength seconds and then ping the user
            setTimeout(() => {
                let sessionEndMessage = `<@${message.author.id}>, your session has finished!` +
                                        " Good job! 😊";
                message.channel.send(sessionEndMessage);
            }, sessionLength * 60 * 5 * 1000);
        }
    }).catch((collected) => {
        console.log("no response");
        message.channel.send("Your request has timed out due to lack of response.");
    });
    
    // add the acceptable options (reactions)
    for (let option = 0; option < reactionArray.length; option++) {
        await botMessage.react(reactionArray[option]);
    }
}

client.login(token_file.token);