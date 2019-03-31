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
				<product :product="product" />
			</div>
		</div>
	</div>

	<div v-else class="columns is-marginless">
		<div v-if="loading" class="column">
			<p class="title is-3">
				Loading...
			</p>
		</div>
		<div v-else class="column">
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
	data() {
		return {
			loading: true,
			category: null,
			products: []
		};
	},
	async mounted() {
		this.loading = true;
		this.category = await this.$store.getters.get_category(this.id);
		this.products = await this.$store.getters.get_products({ product_category: this.id });
		this.loading = false;
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
