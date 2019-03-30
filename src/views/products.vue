<template>
	<div>
		<div class="columns is-marginless">
			<div class="column">
				<p class="title is-1 has-text-centered-touch">
					Products {{ $route.query.category ? ` of TODO` : '' }}
				</p>
			</div>
		</div>

		<div class="columns is-multiline is-marginless">
			<div v-for="(product, key) in products" :key="key" class="column is-4-desktop is-6-tablet">
				<product :product="product" />
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
	data() {
		return {
			products: null
		};
	},
	async mounted() {
		this.products = await (await fetch(`${this.$store.state.api}/products?${encodeURI(this.$router.query)}`)).json();
	}
};
</script>
