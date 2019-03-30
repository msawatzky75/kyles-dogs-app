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

		<div class="card-content">
			<p>{{ product.description.capitalize() }}</p>
		</div>

		<div v-if="product.image.url" class="card-image">
			<figure class="image">
				<img :src="product.image.url" :alt="product.name">
			</figure>
		</div>

		<div class="card-footer">
			<!-- <div class="card-footer-item">
				<router-link :to="{ name: 'product', params: { id: product.id } }">
					View prodcut
				</router-link>
			</div> -->

			<div class="card-footer-item">
				<router-link :to="{ name: 'category', params: { id: product.product_category_id } }">
					Category: TODO: use store to get category here
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

<style lang="scss" scoped>
</style>
