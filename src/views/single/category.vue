<template lang="html">
	<div v-if="category">
		<div class="columns is-marginless">
			<div class="column is-12-touch">
				<p class="title is-3 has-text-centered-touch">
					{{ category.name.titleize() }}
				</p>

				<p class="has-text-centered-touch">
					{{ category.description.capitalize() }}
				</p>
			</div>
		</div>

		<div class="columns is-multiline is-marginless">
			<div v-for="(product, key) in products" :key="key" class="column is-4-desktop is-6-tablet">
				<product :id="product" />
			</div>
		</div>
	</div>

	<div v-else class="columns is-marginless">
		<div class="column">
			<p class="title is-2">
				Category {{ id }} does not exist
			</p>
		</div>
	</div>
</template>

<script>
import Product from "@/components/product";
export default {
	name: "Category",
	components: {
		Product
	},
	props: {
		id: {
			type: String,
			required: true
		}
	},
	computed: {
		products() { return (this.$store.getters.get_search_by_query({ product_category: Number(this.id) }) || { products: [] }).products; },
		category() { return this.$store.getters.get_category(this.id); }
	},
	async mounted() {
		this.$store.dispatch("search", { product_category: Number(this.id) });
	},
	methods: {
		getCurreny(num) {
			let str = num.toString();
			return `$${str.substring(0, str.length - 2)}.${str.substring(str.length - 2)}`;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
