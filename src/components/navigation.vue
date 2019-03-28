<template lang="html">
	<div class="navbar" role="navigation">
		<!-- Main site logo -->
		<div class="navbar-brand">
			<router-link class="navbar-item" :to="{ name: 'home' }">
				Kyle's Dogs
			</router-link>

			<a role="button" class="navbar-burger" @click="showMobileNav = !showMobileNav">
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>

		<div class="navbar-menu" :class="{ 'is-active': showMobileNav }">
			<router-link v-for="(link, key) in links" :key="key" class="navbar-item" :to="link.to">
				{{ link.name }}
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "NavBar",
	props: {
		links: { type: Array, required: true }
	},
	data() {
		return {
			showMobileNav: false
		};
	},
	methods: {
		toggleMobileNav: () => this.showMobileNav = !this.showMobileNav
	}
};
</script>

<style lang="scss" scoped>
</style>
