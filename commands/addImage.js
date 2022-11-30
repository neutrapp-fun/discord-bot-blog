const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addimage')
		.setDescription('Send an image url to neutrapp.com')
		.addStringOption(option =>
			option
				.setName("url")
				.setDescription("The image url")
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('Image has been send');
	},
};