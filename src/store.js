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
		product_status_codes: [],
		searches: [],
		user: null
	},
	getters: {
		get_category: state => id => state.categories.find(c => c.id == id),
		get_product: state => id => state.products.find(p => p.id == id),
		get_product_status_code: state => id => state.product_status_codes.find(s => s.id == id),
		get_search_by_query: state => query => state.searches.find(s => JSON.stringify(s.query) == JSON.stringify(query))
	},
	// Mutations must be synchronous
	mutations: {
		add_category: (state, category) => state.categories.push(category),
		add_product: (state, product) => state.products.push(product),
		add_product_status_code: (state, status) => state.product_status_codes.push(status),
		add_search: (state, { query, meta, products }) => state.searches.push({ query, meta, products })
	},
	actions: {
		async fetch_category({ commit, getters, state }, id) {
			// If its not already in the store
			if (!getters.get_category(id)) {
				commit("add_category", await (await fetch(`${state.api}/product_categories/${id}`)).json());
			}
		},
		async fetch_product_status({ commit, getters, state }, id) {
			// If its not already in the store
			if (!getters.get_product_status_code(id)) {
				commit("add_product_status_code", await (await fetch(`${state.api}/product_status_codes/${id}`)).json());
			}
		},
		async fetch_product_status_codes({ commit, getters, state}) {
			let codes = await (await fetch(`${state.api}/product_status_codes`)).json();
			for (let key in codes) {
				// If its not already in the store
				if (!getters.get_product_status_code(codes[key].id)) {
					commit("add_product_status_code", codes[key]);
				}
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
			if (!getters.get_search_by_query(query)) {
				let products = [];
				let data = await (await fetch(`${state.api}/products?${encode_params(query)}`)).json();
				// Add the products after the api call.

				for (let key in data.data) {
					products.push(data.data[key].id);
					if (!getters.get_product(data.data[key].id)) {
						// request to cache the category and status
						// gotta be careful to not send too many at once, could cause duplicates in the store.
						await dispatch("fetch_category", data.data[key].product_category_id);
						await dispatch("fetch_product_status", data.data[key].product_status_code_id);
						// cache the product
						commit("add_product", data.data[key]);
					}
				}

				commit("add_search", { query, meta: data.meta, products });
			}
		}
	}
});
