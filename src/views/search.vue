<template>
	<div>
		<div class="columns is-marginless">
			<div class="column">
				<label class="label">Search</label>
				<input v-model="search" class="input" placeholder="Search" @change="fetch_search(1)">
			</div>
		</div>
		<div class="columns is-marginless">
			<div class="column">
				<label for="category" class="label">Category</label>
				<div class="select is-fullwidth">
					<select id="category" v-model="product_category" @change="fetch_search(1)">
						<option v-for="(c, key) in [{ id: null, name: 'All' }, ...$store.state.categories]" :key="key" :value="c.id">{{ c.name.capitalize() }}</option>
					</select>
				</div>
			</div>

			<div class="column">
				<label for="status_code" class="label">Status</label>
				<div class="select is-fullwidth">
					<select id="status_code" v-model="product_status_code" @change="fetch_search(1)">
						<option v-for="(psc, key) in [{ id: null, name: 'All' }, ...$store.state.product_status_codes]" :key="key" :value="psc.id">{{ psc.name.capitalize() }}</option>
					</select>
				</div>
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
	components: { Product, Pagination },
	data() {
		return {
			search: "",
			product_category: null,
			product_status_code: null,
		};
	},
	computed: {
		totalPages() { return (this.$store.getters.get_search_by_query({ ...this.$route.query, search: this.search }) || { meta: {} }).meta.total_pages || 10; },
		products() { return (this.$store.getters.get_search_by_query({ ...this.$route.query, search: this.search }) || { products: [] }).products; }
	},
	watch: {
		$route() {
			this.fetch_search();
		}
	},
	created() {
		this.search = this.$route.query.search || "";
		this.product_category = this.$route.query.product_category || null;
		this.product_status_code = this.$route.query.product_status_code || null;
		this.fetch_search(1);
	},
	methods: {
		fetch_search(page) {
			let query = { ...this.$route.query, search: this.search, product_category: this.product_category, product_status_code: this.product_status_code };
			if (page) { query.page = page; }
			this.$store.dispatch("search", query);
			this.$router.replace({ name: "search", query });
		}
	}
};
</script>
