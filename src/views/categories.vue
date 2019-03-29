<template>
	<div>
		<p class="title is-1">
			Categories
		</p>
		<div class="columns is-multiline">
			<div v-for="(category, key) in categories" :key="key" class="column is-3 is-6-touch">
				<p class="title is-3">
					{{ category.name }}
				</p>
				<p>{{ category.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Categories",
	data() {
		return {
			categories: null
		};
	},
	async created() {
		this.categories = await (await fetch(`${this.$store.state.api}/product_categories`)).json();
	}
};
</script>
