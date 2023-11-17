// const paypal = require("@paypal/checkout-server-sdk");
import paypal from "@paypal/checkout-server-sdk";
export default defineEventHandler(async (event) => {
	//sb-r3i8728237303@personal.example.com
	// 5*^h4Ba-
	//sb-co0xe28237304@business.example.com
	//$n-v2+Y:
	const config = useRuntimeConfig();
	const clientId = config.public.paypalClientId as string;

	const clientSecret = config.paypalClientSecret as string;

	const environment = new paypal.core.SandboxEnvironment(
		clientId,
		clientSecret
	);
	const client = new paypal.core.PayPalHttpClient(environment);
	const request = new paypal.orders.OrdersCreateRequest();

	request.prefer("return=representation");
	const body = await readBody(event);
	const total = body.reduce((sum, item) => {
		return sum + item.price * item.total_quantity;
	}, 0);
	request.requestBody({
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					currency_code: "USD",
					value: total,
					breakdown: {
						item_total: {
							currency_code: "USD",
							value: total,
						},
					},
				},
				items: body.map((item) => {
					return {
						name: item.title,
						sku: item.sku,
						category: item.category,
						unit_amount: {
							currency_code: "USD",
							value: item.price,
						},
						quantity: item.total_quantity,
					};
				}),
			},
		],
	});

	const order = await client.execute(request);

	return { id: order.result.id };
});
