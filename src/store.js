import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		api: "http://localhost:3000/v1",
		theme: "dark",
		categories: [],
		products: [],
		user: null
	},
	getters: {
		get_category: state => async (id) => {
			let category = state.categories.find(c => c.id == id);

			if (!category) {
				// Product has not been cached.
				category = await (await fetch(`${state.api}/product_categories/${id}`)).json();
				state.categories.push(category);
			}

			return category;
		},
		get_product: (state, getters) => async (id) => {
			// Try to find it in the store
			let product = state.products.find(p => p.id == id);

			// If its not there, request it.
			if (!product) {
				product = await (await fetch(`${state.api}/products/${id}`)).json();
				// Product has not been cached.
				state.products.push(product);
			}

			// Add the category for covenience.
			product.category = await getters.get_category(product.product_category_id);

			return product;
		},
		get_products: (state, getters) => async (query) => {
			// No guarentee that all of them are in the store, must request.
			let products = await (await fetch(`${state.api}/products?${encodeURI(query)}`)).json();

			// Cache new products (refreshes every session)
			for (let key in products) {
				if (!state.products.find(p => p.id == products[key].id)) {
					// Product has not been cached.
					state.products.push(products[key]);
				}

				// To get the category data with the product.
				// This should not query the api again because we just cached this data.
				products[key] = await getters.get_product(products[key].id);
			}

			return products;
		}
	},
	// Mutations must be synchronous
	mutations: {},
	actions: {}
});
