const { SlashCommandBuilder } = require('discord.js');
const { supabase } = require('../supabase.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('write')
		.setDescription('Envoyer un nouveau post sur Blue Boules')
		.addStringOption(option =>
			option
				.setName("texte")
				.setDescription("Le texte de votre post")
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName("tags")
				.setDescription("Les tags de votre post (séparé par des points virgule)")
				.setRequired(true)),
	async execute(interaction) {
		const texte = interaction.options.getString("texte")
		let tags = interaction.options.getString("tags")

		const { data, error } = await supabase
			.from('posts')
			.insert({ content: texte, status: 0, upvotes: 0})
			.select()

		let post_id = data[0].id

		tags = tags.split(";")
		let tagsGetError = false
		let tagsError = []
		for(const tag of tags){
			const { data, error } = await supabase
			.from('tags')
			.select('*')
			.eq('name', tag.toUpperCase())

			let dataResult = data

			if(data.length == 0){
				tagsGetError = true
				tagsError.push(tag)
			}else{

				const { data, error } = await supabase
				.from('posts_tags')
				.insert({fk_posts: post_id, fk_tags: dataResult[0].id})
			}
		}

		await interaction.reply('Le post à été envoyé' + (tagsGetError ? ". Cependant, certains tags ont été ignoré ("+tagsError.join(", ")+")":""));
	},
};