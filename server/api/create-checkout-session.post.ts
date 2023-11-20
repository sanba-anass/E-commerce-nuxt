import Stripe from "stripe";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const stripe = new Stripe(config.stripeSecretKey);
	const WEBSITE_URL = config.public.websiteUrl;
	try {
		const body = await readBody(event);

		const session = await stripe.checkout.sessions.create({
			custom_text: {},
			line_items: body.map((item) => {
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.title,
							description: item.description,
							images: body.map((_) => item.image),
						},
						unit_amount: item.price * 100,
					},
					quantity: item.total_quantity,
				};
			}),

			mode: "payment",
			payment_method_types: ["card"],

			success_url: `${WEBSITE_URL}/success`,
			cancel_url: `${WEBSITE_URL}/shop/cart`,

		});
		
		return { sessionUrl: session.url };
	} catch (e) {
		console.error(e);
		return { error: e?.message };
	}
});
