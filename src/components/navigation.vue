<template lang="html">
	<div class="navbar" role="navigation">
		<!-- Main site logo -->
		<div class="navbar-brand">
			<router-link class="navbar-item" :to="{ name: 'home' }">
				Kyle's Dogs
			</router-link>
		</div>

		<div class="navbar-menu" :class="{ 'is-active': showMobileNav }">
			<div class="navbar-item" :to="{ name: 'all-products' }">
				<router-link>All</router-link>
			</div>

			<div class="navbar-item" :to="{ name: 'new-products' }">
				<router-link>New</router-link>
			</div>

			<div class="navbar-item" :to="{ name: 'sale-products' }">
				<router-link>Sales</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			showMobileNav: false
		};
	},
	methods: {
		toggleMobileNav() {
			this.showMobileNav = !this.showMobileNav;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
