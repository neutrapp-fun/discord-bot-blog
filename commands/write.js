const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('write')
		.setDescription('Send a new blog on neutrapp.com')
		.addStringOption(option =>
			option
				.setName("slug")
				.setDescription("The article slug")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("content")
				.setDescription("The article content")
				.setRequired(true)),
	async execute(interaction) {
		const content = interaction.options.getString("content")
		const title = interaction.options.getString("title")

		await interaction.reply('Post has been send : https://neutrapp.com/blog/'+title);
	},
};