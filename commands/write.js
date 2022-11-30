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
		const slug = interaction.options.getString("slug")

		fetch('https://neutrapp.com/api/posts', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "content": content })
		})
		.then(response => response.json())
		.then(response => console.log(JSON.stringify(response)))

		await interaction.reply('Post has been send : https://neutrapp.com/blog/'+slug);
	},
};