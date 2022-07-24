module.exports = {
    name: "suggest",
    description: "Suggest something!",
    aliases: ["sg", "s"],
    callback(client, message, args, discord) {
        let suggestionTitle = ""
        if (args.find(x => x.startsWith("["))) {
            if (args.find(x => x.endsWith("]"))) {
                for (let i = 0; i < (args.indexOf(args.find(x => x.endsWith("]"))) - args.indexOf(args.find(x => x.startsWith("[")))) + 1; i++) {
                    suggestionTitle += args[args.indexOf(args.find(x => x.startsWith("["))) + i]
                    if (i < (args.indexOf(args.find(x => x.endsWith("]"))) - args.indexOf(args.find(x => x.startsWith("["))))) {
                        suggestionTitle += " "
                    }
                }
            } else {
                message.reply("Please make sure you have a closing bracket!")
                return
            }
        } else {
            message.reply("Please provide a title for your suggestion!")
            return
        }
        suggestionTitle = suggestionTitle.slice(1, -1)
        let suggestion = args.join(" ").replace("[" + suggestionTitle + "]", "")

        let embed = new discord.MessageEmbed()
            .setColor("YELLOW")
            .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({ format: "png" }), url: "https://discord.com/users/" + message.author.id })
            .setTitle(suggestionTitle)
            .setDescription(suggestion)
            .setFooter({ text: "Pending" })

        const suggestionChannel = "962112925202546698"

        client.channels.fetch(suggestionChannel).then((msgEmbed) => {
            msgEmbed.send({
                embeds: [embed]
            }).then((msg) => {
                msg.startThread({
                    name: suggestionTitle,
                }).then((thread) => {
                    thread.members.add(message.author.id)
                }).then(() => {
                    msg.react("👍").then(() => {
                        msg.react("👎")
                    })
                })
            })
        })
        message.reply("Your suggestion has been sent!")
    }
}