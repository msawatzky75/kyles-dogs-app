<template lang="html">
	<div class="card">
		<div class="card-header">
			<router-link :to="{ name: 'product', params: { id: product.id } }" class="card-header-title">
				{{ product.name.capitalize() }}
			</router-link>
			<p class="card-header-title has-text-right is-block">
				{{ getCurreny(product.price) }}
			</p>
		</div>

		<div v-if="product.image.url" class="card-image">
			<figure class="image">
				<img :src="$store.state.api_domain + product.image.url" :alt="product.name">
			</figure>
		</div>

		<div class="card-content">
			<p>{{ product.description.capitalize() }}</p>
		</div>

		<div class="card-footer">
			<div class="card-footer-item is-position-relative">
				<p class="subtitle is-7 is-overlay has-padding-small is-top-left">
					Category
				</p>
				<router-link :to="{ name: 'category', params: { id: product.product_category_id } }">
					{{ product.category.name.capitalize() }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Product",
	props: {
		product: {
			type: Object,
			required: true
		}
	},
	methods: {
		getCurreny(num) {
			let str = num.toString();
			return `$${str.substring(0, str.length - 2)}.${str.substring(str.length - 2)}`;
		}
	}
};
</script>

<style lang="scss">
.is-position-relative {
	position: relative;
}
.has-padding-small {
	padding: .2em
}
.is-top-left {
	top: 0 !important;
	left: 0 !important;
	right: unset !important;
	bottom: unset !important;
}
</style>
