// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/image",
		[
			"@nuxtjs/google-fonts",
			{
				families: {
					Roboto: true,
					Inter: [400, 700],
					"Josefin+Sans": true,
					Lato: [100, 300, 700],
					Raleway: {
						wght: [100, 400],
						ital: [100],
					},
					"Nunito Sans": [200, 400, 500, 700],
				},
			},
		],
	],

	googleFonts: {
		preload: true,
		download: true,
	},
	routeRules: {
		"/": { prerender: true },
	},
});
