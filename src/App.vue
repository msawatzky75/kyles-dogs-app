<template>
	<div id="app">
		<kd-navigation :links="links" />

		<div class="container">
			<router-view />
		</div>
	</div>
</template>

<script>
import Navigation from "@/components/navigation";
export default {
	components: {
		"kd-navigation": Navigation
	},
	data() {
		return {
			links: [
				{ name: "Home", to: { name: "home" } },
				{ name: "Products", to: { name: "products" } },
				{ name: "Categories", to: { name: "categories" } },
				{ name: "Search", to: { name: "search" } },
				{ name: "About", to: { name: "about" } },
				{ name: "Contact", to: { name: "contact" } }
			]
		};
	},
	created() {
		// Set the scss theme.
		switch (this.$store.state.theme) {
			case "dark": require("@/assets/dark.scss"); break;
			default: require("bulma");
		}
		this.$store.dispatch("fetch_product_status_codes");
		this.$store.dispatch("fetch_product_categories");
	}
};
</script>
