// Extract fetch from the module
const fetch = require("node-fetch")
    
const prefix = "\\"
// Extract the required classes from the discord.js module
const { Client, MessageEmbed } = require('discord.js');
// Create an instance of a Discord client
const client = new Client();
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', async message => {
        // If the message starts with "t "
        if (message.content.startsWith(`${prefix}`)) {
        // Delete the message
        message.delete()
        // Remove the ", " from the text
        let word = message.content.replace(`${prefix}`, "")
        
        // Extract info from the word
        let wordQuestion = word.split(" | ")[0]
        let wordIndex = word.split(" | ")[1] - 1
        
        // Search for the meaning of the ${word} 
        const search = await fetch(`https://api.urbandictionary.com/v0/define?term=${wordQuestion}`)
            .then(meaning => meaning.json())
        // Take the definition from the search
        let definition = search.list[wordIndex?wordIndex:0].definition
        // Take the example from the search
        let example = search.list[wordIndex?wordIndex:0].example
        // We can create embeds using the MessageEmbed constructor
        const embed = new MessageEmbed()
            // Set the author of the field
            .setAuthor(message.author.username, message.author.avatarURL())
            // Set the title of the fieldS
            .setTitle(wordQuestion)
            // Set the color of the embed
            .setColor(0xf1c40f)
            // Set the main content of the embed
            .setDescription(definition?
                `${definition}\n${example?
                    `\n**Example**\n${example}`:""}`:
                `No definitions could be found for: ${wordQuestion}`);
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login('Your Token');    

