module.exports = {
    name: "suggestion",
    description: "Approve/Disapprove a suggestion",
    callback(client, message, args, Discord) {
        const suggestionID = args[0]
        if (!suggestionID) {
            message.reply("Please provide a suggestion ID!")
            return
        }
        if (!args[1]) return message.reply("Please provide if the suggestion needs to be approved or disapproved!")
        if (args[1].toLowerCase() === "approve") {
            client.channels.fetch("962112925202546698").then((msgEmbed) => {
                msgEmbed.messages.fetch(suggestionID).then((msg) => {
                    msg.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .setAuthor({ name: msg.embeds[0].author.name, iconURL: msg.embeds[0].author.iconURL, url: msg.embeds[0].author.url })
                                .setTitle(msg.embeds[0].title)
                                .setDescription(msg.embeds[0].description)
                                .setFooter({ text: "Approved" })
                        ]
                    })
                }).catch((err) => {
                    message.reply("Could not find the suggestion!")
                })
            })
        } else if (args[1].toLowerCase() === "disapprove") {
            client.channels.fetch("962112925202546698").then((msgEmbed) => {
                msgEmbed.messages.fetch(suggestionID).then((msg) => {
                    console.log(msg.embeds[0])
                    msg.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("RED")
                                .setAuthor({ name: msg.embeds[0].author.name, iconURL: msg.embeds[0].author.iconURL, url: msg.embeds[0].author.url })
                                .setTitle(msg.embeds[0].title)
                                .setDescription(msg.embeds[0].description)
                                .setFooter({ text: "Disapproved" })
                        ]
                    })
                }).catch((err) => {
                    message.reply("Could not find the suggestion!")
                })
            })
        }
    }
}