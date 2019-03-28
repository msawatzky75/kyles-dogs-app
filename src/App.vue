<template>
	<div id="app">
		<kd-navigation />

		<div class="container">
			<router-view />
		</div>
	</div>
</template>

<script>
import Navigation from "@/components/navigation";
export default {
	components: {
		"kd-navigation": Navigation
	}
};
</script>

<style lang="scss">
@import "@/assets/custom.scss";
</style>
