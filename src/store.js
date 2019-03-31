const encode_params = p => Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		api: "http://localhost:3000/v1",
		api_domain: "http://localhost:3000",
		theme: "dark",
		categories: [],
		products: [],
		// Will be used for pagination buttons
		query_meta: null,
		// Array of product ids, returned from a search.
		search: [],
		user: null
	},
	getters: {
		get_category: state => id => state.categories.find(c => c.id == id),
		get_product: state => id => state.products.find(p => p.id == id),
		get_search: (state, getters) => state.search.map(id => getters.get_product(id))
	},
	// Mutations must be synchronous
	mutations: {
		add_category: (state, category) => state.categories.push(category),
		add_product: (state, product) => state.products.push(product),
		set_query_meta: (state, meta) => state.meta = meta,
		reset_search: state => state.search = [],
		add_to_search: (state, id) => state.search.push(id)
	},
	actions: {
		async fetch_category({ commit, getters, state }, id) {
			// If its not already in the store
			if (!getters.get_category(id)) {
				let category = await (await fetch(`${state.api}/product_categories/${id}`)).json();
				commit("add_category", category);
			}
		},
		async fetch_product({ commit, dispatch, getters, state }, id) {
			if (!getters.get_product(id)) {
				let product = await (await fetch(`${state.api}/products/${id}`)).json();
				dispatch("fetch_category", product.product_category_id);
				commit("add_product", product);
			}
		},
		async search({ commit, dispatch, getters, state }, query) {
			let data = await (await fetch(`${state.api}/products?${encode_params(query)}`)).json();
			commit("set_query_meta", data.meta);
			commit("reset_search");

			for (let key in data.data) {
				// record the product id in the most recent search
				commit("add_to_search", data.data[key].id);
				if (!getters.get_product(data.data[key].id)) {
					// cache the category
					dispatch("fetch_category", data.data[key].product_category_id);
					// cache the product
					commit("add_product", data.data[key]);
				}
			}
		}
	}
});
