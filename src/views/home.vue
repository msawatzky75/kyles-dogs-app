<template lang="html">
	<div>
		<div v-for="(status_code, index) in product_status_codes" :key="index">
			<div class="columns is-marginless">
				<div class="column">
					<p class="title is-2">{{ status_code.name.capitalize() }}</p>
				</div>
			</div>

			<carousel v-if="$store.getters.get_search_by_query({ product_status_code: status_code.id })" class="columns is-marginless" :per-page="3" navigation-enabled :pagination-enabled="false">
				<slide v-for="(pid, index2) in $store.getters.get_search_by_query({ product_status_code: status_code.id }).products" :key="index2">
					<div class="is-padded">
						<product :id="pid" />
					</div>
				</slide>
				<!-- Customizable loading -->
				<div slot="loading">
					loading...
				</div>
			</carousel>
			<div v-else class="columns">
				<div class="column">
					No Products
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Product from "@/components/product";
import { Carousel, Slide } from "vue-carousel";
export default {
	components: { Carousel, Slide, Product },
	computed: {
		product_status_codes() { return this.$store.state.product_status_codes; }
	},
	async mounted() {
		await this.$store.dispatch("fetch_product_status_codes");
		for (let key in this.product_status_codes) {
			this.$store.dispatch("search", { product_status_code: this.product_status_codes[key].id });
		}
	}
};
</script>

<style lang="scss" scoped>
.is-padded {
	padding: 0 0.2em;
}
</style>
