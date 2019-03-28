<template lang="html">
	<div v-if="product" class="columns">
		<div v-if="product.image.url" class="column is-12-touch">
			<figure class="image is-4by3">
				<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Product">
			</figure>
		</div>

		<div class="column is-12-touch">
			<p class="title is-3 has-text-centered-touch">
				{{ product.name }}
				<small>({{ getCurreny(product.price) }})</small>
			</p>
			<p class="has-text-centered-touch">
				{{ product.description }}
			</p>
		</div>
	</div>
	<div v-else>
		<template v-if="loading">
			<p class="title is-3">
				Loading...
			</p>
		</template>
		<template v-else>
			<p class="title is-2">
				Product {{ id }} does not exist
			</p>
		</template>
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
	data() {
		return {
			loading: true,
			product: null
		};
	},
	async created() {
		this.loading = true;
		this.product = await (await fetch(`${this.$store.state.api}/products/${this.id}`)).json();
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
