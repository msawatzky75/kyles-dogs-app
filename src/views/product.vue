<template lang="html">
	<div class="columns">
		<div class="column">
			<figure class="image is-4by3">
				<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Product">
			</figure>
		</div>

		<div class="column">
			Product id: {{ id }}
		</div>
	</div>
</template>

<script>
export default {
	name: "Product",
	props: {
		id: {
			type: Number,
			required: true
		}
	},
	data() {
		return {

		};
	},
	created() {

	}
};
</script>

<style lang="scss" scoped>
</style>
