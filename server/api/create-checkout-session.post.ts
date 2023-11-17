import Stripe from "stripe";

export default defineEventHandler(async (event) => {
	const stripe = new Stripe(
		"sk_test_51O96FoABR43x3i9Xtmx23sRylJe3pWN4foixTgR7HvaBZMxJVUIxlUMrCFFloDGGFcokT8xJa9lrivAFvHvRVRkE008NdIpUpG"
	);
	const YOUR_DOMAIN = "http://localhost:3000";
	try {
		const body = await readBody(event);

		const session = await stripe.checkout.sessions.create({
			custom_text: {
				
			},
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

			success_url: `${YOUR_DOMAIN}/success`,
			cancel_url: `${YOUR_DOMAIN}/shop/cart`,
		});
		console.log(body);

		return { sessionUrl: session.url };
	} catch (e) {
		console.error(e);
		return { error: e?.message };
	}
});
