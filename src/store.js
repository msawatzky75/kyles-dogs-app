import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		api: "http://localhost:3000/v1",
		theme: "dark"
	},
	mutations: {},
	actions: {}
});
