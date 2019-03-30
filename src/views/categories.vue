<template>
	<div>
		<div class="columns is-marginless">
			<div class="column">
				<p class="title is-1 has-text-centered-touch">
					Categories
				</p>
			</div>
		</div>

		<div class="columns is-multiline is-marginless">
			<div v-for="(category, key) in categories" :key="key" class="column is-4-desktop is-6-tablet">
				<category :category="category" />
			</div>
		</div>
	</div>
</template>

<script>
import Category from "@/components/category";
export default {
	name: "Categories",
	components: {
		Category
	},
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
