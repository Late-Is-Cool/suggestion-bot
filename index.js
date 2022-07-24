require("dotenv").config()

const Discord = require("discord.js")
const client = new Discord.Client({
    intents: 34305
})

client.commands = new Discord.Collection()

const fs = require("fs")
const commandFolder = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for (const file of commandFolder) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
} 

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    console.log(`Loaded ${client.commands.size} commands!`)
})

client.on("messageCreate", (message) => {
    if (message.author.bot) return
    if (message.cleanContent.toLowerCase().startsWith(process.env.PREFIX)) {
        const args = message.content
            .slice(process.env.PREFIX.length)
            .split(" ");
        const commandName = args.shift().toLowerCase();
        const command =
            client.commands.get(commandName) ||
            client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );
        if (!command) return;
        try {
            command.callback(client, message, args, Discord);
        } catch (e) {
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setTitle("Oops!")
                        .setColor("RED")
                        .setDescription(
                            `Apparently there was an error!\n\`\`\`${e}\`\`\``
                        ),
                ],
            });
        }
    }
})

client.on("guildMemberAdd", (member) => {
    // assign role to new member
    const roleID = "957302771747541122"
    member.roles.add(roleID)
})

client.login(process.env.TOKEN)