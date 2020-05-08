const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const dateFormat = require("dateformat");
const fetch = require("node-fetch");

module.exports = { 
	name: "steam",
    description: "Returns steam information",
    usage: "-steam <user>",
    category: "information",
		run: async (client, message, args) => {
			const token = "YOUR-STEAM-KEY";
			if(!args[0]) return message.channel.send("Please enter account name!");
			const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) return message.channel.send("I can't find an account with that name!");

                const id = body.response.steamid;
                const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
                const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
                const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

        fetch(summaries).then(res => res.json()).then(body => {
            if(!body.response) return message.channel.send("I couldn't find a steam profile with that name");
            const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0];

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) return message.channel.send("I couldn't find a steam profile with that name");
            const { NumberOfVACBans, NumberOfGameBans} = body.players[0];

            const steam = new MessageEmbed()
                .setColor(cyan)
                .setAuthor(`Steam services | ${personaname}`, avatarfull)
                .setThumbnail(avatarfull)
                .setDescription(stripIndents`**Name:** ${realname || "Unknown"}
                **State:** ${state[personastate]}
                **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                **Account Create:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
                **Ban:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [Profile Link](${profileurl})`)
                .setTimestamp();

                message.channel.send(steam)
            })
        })
    })
  }
}