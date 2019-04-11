<template>
	<div>
		<div class="tabs">
			<ul>
				<router-link v-for="(status_code, index) in product_status_codes" :key="index" tag="li" :to="{ name: 'status_code', params: { status_code_name: status_code.name.toLowerCase() } }" active-class="is-active" exact>
					<a>{{ status_code.name }}</a>
				</router-link>
			</ul>
		</div>

		<div class="columns is-marginless">
			<div class="column">
				<p class="title is-1 has-text-centered-touch">
					Products
				</p>
			</div>
		</div>

		<div class="columns is-multiline is-marginless">
			<div v-for="(product, key) in products" :key="key" class="column is-4-desktop is-6-tablet">
				<product :id="product" />
			</div>
		</div>

		<div class="columns is-marginless">
			<div class="column">
				<pagination :total-pages="totalPages" />
			</div>
		</div>
	</div>
</template>

<script>
import Product from "@/components/product";
import Pagination from "@/components/pagination";
export default {
	name: "Products",
	components: {
		Product, Pagination
	},
	computed: {
		totalPages() { return (this.$store.getters.get_search_by_query({ ...this.$route.query, product_status_code_name: this.$route.params.status_code_name || "all" }) || { meta: {} }).meta.totalPages || 10; },
		products() { return (this.$store.getters.get_search_by_query({ ...this.$route.query, product_status_code_name: this.$route.params.status_code_name || "all" }) || { products: [] }).products; },
		product_status_codes() { return [{ name: "All" }, ...this.$store.state.product_status_codes.filter(psc => !psc.name.toLowerCase().includes("normal"))]; }
	},
	watch: {
		$route() { this.$store.dispatch("search", { ...this.$route.query, product_status_code_name: this.$route.params.status_code_name || "all" }); },
	},
	mounted() {
		this.$store.dispatch("search", { ...this.$route.query, product_status_code_name: this.$route.params.status_code_name || "all" });
	}
};
</script>
