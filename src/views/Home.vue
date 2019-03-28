<template lang="html">
	<div>
		<p class="title is-1">
			On Sale!
		</p>
		<product-slider :products="[]" />
	</div>
</template>

<script>
import ProductSlider from "product-slider.vue";
export default {
	components: {
		ProductSlider
	}
};
</script>
