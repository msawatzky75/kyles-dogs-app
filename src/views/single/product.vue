<template lang="html">
	<div v-if="product" class="columns is-marginless">
		<div v-if="product.image.url" class="column is-12-touch">
			<figure class="image is-4by3">
				<img :src="$store.state.api_domain + product.image.url" alt="Product">
			</figure>
		</div>

		<div class="column is-12-touch">
			<p class="title is-3 has-text-centered-touch">{{ product.name }} <small>({{ getCurreny(product.price) }})</small></p>
			<p class="has-text-centered-touch">{{ product.description }}</p>
			<hr>
			<p class="title is-5">{{ category.name.capitalize() }} - <small>{{ category.description }}</small> </p>
			<p class="has-text-centered-touch" />
		</div>
	</div>

	<div v-else>
		<p class="title is-2">
			Product {{ id }} does not exist
		</p>
	</div>
</template>

<script>
export default {
	name: "Product",
	props: {
		id: {
			type: String,
			required: true
		}
	},
	computed: {
		product() { return this.$store.getters.get_product(this.$route.params.id); },
		category() { return this.$store.getters.get_category(this.product.product_category_id); }
	},
	mounted() {
		this.$store.dispatch("fetch_product", this.$route.params.id);
	},
	methods: {
		getCurreny(num) {
			let str = num.toString();
			return `$${str.substring(0, str.length - 2)}.${str.substring(str.length - 2)}`;
		}
	}
};
</script>
