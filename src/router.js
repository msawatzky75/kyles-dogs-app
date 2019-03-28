import Vue from "vue";
import Router from "vue-router";

import Home from "./views/home.vue";
import About from "./views/about.vue";
import Category from "./views/single/category.vue";
import Categories from "./views/categories.vue";
import Product from "./views/single/product.vue";
import Products from "./views/products.vue";
import Search from "./views/search.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ path: "/", name: "home", component: Home },
		{ path: "/home", redirect: "/" },
		{ path: "/about", name: "about", component: About },
		{ path: "/category/:id", name: "category", props: true, component: Category },
		{ path: "/categories", name: "categories", component: Categories },
		{ path: "/product/:id", name: "product", props: true, component: Product },
		{ path: "/products", name: "products", component: Products },
		{ path: "/search", name: "search", component: Search },
	]
});
