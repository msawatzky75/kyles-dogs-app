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
				{ name: "Categories", to: { name: "categories" } },
				{ name: "Search", to: { name: "search" } },
				{ name: "About", to: { name: "about" } },
				{ name: "Contact", to: { name: "contact" } }
			]
		};
	},
	created() {
		switch (this.$store.state.theme) {
			case "dark": require("@/assets/dark.scss"); break;
			default: require("bulma");
		}
	}
};
</script>
