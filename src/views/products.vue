<template>
	<div>
		<div class="columns is-marginless">
			<div class="column">
				<p class="title is-1 has-text-centered-touch">
					Products
				</p>
			</div>
		</div>

		<div class="columns is-multiline is-marginless">
			<div v-for="(product, key) in products" :key="key" class="column is-4-desktop is-6-tablet">
				<product :id="product" />
			</div>
		</div>
	</div>
</template>

<script>
import Product from "@/components/product";
export default {
	name: "Products",
	components: {
		Product
	},
	computed: {
		products() { return (this.$store.getters.get_search_by_query(this.$route.query) || { products: [] }).products; }
	},
	watch: {
		$route() { this.$store.dispatch("search", this.$route.query); }
	},
	mounted() { this.$store.dispatch("search", this.$route.query); }
};
</script>
