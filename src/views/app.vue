<template>
	<div>
		<header-nav />

		<div class="container">
			<router-view />
		</div><!-- container -->
	</div>
</template>

<script>
import HeaderNav from "navigation.vue";
export default {
	components: {
		HeaderNav
	},
	data: function () {
		return {

		};
	},
	created() {

	}
};
</script>
