import Vue from "vue";
import App from "./app.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.titleize = function() {
	let words = this.split(" ");
	let result = "";
	for (let key in words) {
		result += words[key].charAt(0).toUpperCase() + words[key].slice(1) + " ";
	}
	return result;
};

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
