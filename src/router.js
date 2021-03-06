import Vue from "vue";
import Router from "vue-router";

import Home from "./views/home.vue";
import Page from "./views/page.vue";
import Category from "./views/single/category.vue";
import Categories from "./views/categories.vue";
import Product from "./views/single/product.vue";
import Products from "./views/products.vue";
import Search from "./views/search.vue";

Vue.use(Router);
const router = new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{ path: "/", name: "home", component: Home, meta: { title: "Home"} },
		{ path: "/home", redirect: "/" },
		{ path: "/about", name: "about", component: Page, meta: { title: "About" } },
		{ path: "/contact", name: "contact", component: Page, meta: { title: "Contact" } },
		{ path: "/categories", name: "categories", component: Categories, meta: { title: "Categories" } },
		{ path: "/categories/:id", name: "category", props: true, component: Category, meta: { title: "Category" } },
		{ path: "/products", redirect: "/products/all" },
		{ path: "/products/", name: "products", component: Products, meta: { title: "Products" } },
		{ path: "/products/:id", name: "product", props: true, component: Product, meta: { title: "Product" } },
		{ path: "/status_code/:status_code_name", name: "status_code", component: Products, meta: { title: "Products" } },
		{ path: "/search", name: "search", component: Search, meta: { title: "Search" } },
	]
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});

export default router;
