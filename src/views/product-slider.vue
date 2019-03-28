<template lang="html">
	<div class="columns">
		<product v-for="(product, key) in products" :key="key" :product="product" />
	</div>
</template>

<script>
import Product from "product.vue";
export default {
	name: "ProductSlider",
	components: {
		Product
	},
	props: {
		products: {
			type: Array,
			required: true
		}
	}
};
</script>
