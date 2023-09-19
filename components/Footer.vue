<template>
	<div class="footer">
		<div class="footer-content">
			<nav class="footer-nav">
				<div class="links">
					<div class="shop-menu">
						<ul>
							<li>SHOP MENU</li>
							<li>
								<NuxtLink class="footer-link"> Coats & Long Jackets</NuxtLink>
							</li>
							<li><NuxtLink class="footer-link">Skirts</NuxtLink></li>
							<li><NuxtLink class="footer-link">Pants</NuxtLink></li>
						</ul>
						<ul class="second">
							<li class="none">SHOP MENU</li>
							<li>
								<NuxtLink class="footer-link">Dresses</NuxtLink>
							</li>
							<li><NuxtLink class="footer-link">Tops</NuxtLink></li>
							<li><NuxtLink class="footer-link">Accessories</NuxtLink></li>
						</ul>
					</div>
					<div class="help">
						<ul>
							<li>HELP</li>
							<li>
								<NuxtLink class="footer-link">Contact</NuxtLink>
							</li>
							<li>
								<NuxtLink to="/account/login" class="footer-link"
									>My Account</NuxtLink
								>
							</li>
							<li>
								<NuxtLink class="footer-link">Terms & Conditions</NuxtLink>
							</li>
						</ul>
						<ul class="second last">
							<li class="none">Retailers</li>
							<li><NuxtLink class="footer-link">Retailers</NuxtLink></li>
							<li>
								<NuxtLink class="footer-link">Privacy Policy</NuxtLink>
							</li>
							<li class="none">
								<NuxtLink class="footer-link">Privacy Policy</NuxtLink>
							</li>
						</ul>
					</div>
				</div>

				<ul class="newsletter">
					<li>NEWSLETTER</li>
					<form class="news-letter-form">
						<label for="email">Sign up for 10% off your next order* </label>
						<div>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Enter your email address"
							/>
						</div>
						<button>Subscribe</button>
					</form>
				</ul>
			</nav>
		</div>
		<p class="copyright">© 2023 DRESS DOWN</p>
		<ul class="social-links">
			<NuxtLink><FacebookIcon /></NuxtLink>
			<NuxtLink><InstagramIcon /> </NuxtLink>
			<NuxtLink><PinterestIcon /></NuxtLink>
			<NuxtLink><YoutubeIcon /></NuxtLink>
		</ul>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.copyright {
	padding-left: 2.5rem;
	font-size: 0.8rem;
}
.shop-menu,
.help {
	display: flex;
	justify-content: space-between;
	gap: 6rem;
}
.links {
	display: flex;
	gap: 5rem;
}
@media (max-width: 30em) {
	.links > * {
		width: 100%;
	}
}
@media (max-width: 40.4375em) {
	.links {
		justify-content: space-between;
	}
}
@media (max-width:42.75rem) {
	.links {
		gap: 3.5rem;
	}
}
@media (max-width: 72.625em) {
	.shop-menu,
	.help {
		flex-direction: column;
		gap: 0.5rem;
		justify-content: flex-start;
	}
}
.social-links > * {
	cursor: pointer;
}
.social-links > * :hover {
	fill: white;
}
.none {
	opacity: 0;
}
@media (max-width: 72.625em) {
	.none {
		display: none;
	}
}
.social-links {
	display: flex;
	align-items: center;
	gap: 2rem;
	padding: 1rem;
	justify-content: center;
	background-color: #000000;
	width: 100%;
	margin-top: 5rem;
}

.footer-content .footer-nav {
	display: flex;
	justify-content: space-between;
	padding: 6rem 2.5rem;
}
@media (max-width: 40.4375em) {
	.footer-content .footer-nav {
		flex-direction: column;
		width: 100%;
		gap: 5rem;
	}
}
@media (max-width: 28.75em) {
	.footer-content .footer-nav {
		padding-inline: 1.25rem;
	}
	.copyright {
		text-align: center;
	}
}
.footer-content .footer-nav ul li .footer-link {
	color: rgb(126, 126, 126);
	display: inline-block;
	text-decoration: none;
	font-size: 0.95rem;
	cursor: pointer;
}

.footer-content .footer-nav ul li .footer-link:hover {
	color: #e6733e;
}
.footer-content .footer-nav ul li:not(:last-child) .footer-link {
	margin-bottom: 0.5rem;
}
.newsletter {
	width: 30%;
}
@media (max-width: 40.4375em) {
	.newsletter {
		width: 100%;
		margin: 0 auto;
	}
}
.newsletter form input {
	width: 100%;
	padding: 0.6rem;
	outline: 1px solid rgb(185, 185, 185);
	border: 0;
	display: inline-block;
	margin-bottom: 1.35rem;
}
.newsletter form label {
	color: rgb(58, 58, 58);
	margin-bottom: 1rem;
	display: inline-block;
}

.newsletter form input:focus {
	outline: 1px dashed rgb(17, 17, 17);
	background-color: rgb(248, 248, 248);
}
.newsletter form button {
	background: rgb(0, 0, 0);
	border: 0;
	font-weight: 500;
	display: inline-block;
	padding: 0.75rem 2rem;
	font-size: 1rem;
	color: white;
}

@media (max-width: 28.75em) {
	.newsletter form button {
		width: 100%;
	}
}
.footer-content .footer-nav ul li:first-child {
	margin-bottom: 1.5rem;
	font-size: 0.85rem;
	letter-spacing: 1px;
}
</style>
