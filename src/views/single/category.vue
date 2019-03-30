<template lang="html">
	<div v-if="category" class="columns is-marginless">
		<div class="column is-12-touch">
			<p class="title is-3 has-text-centered-touch">
				{{ category.name.titleize() }}
			</p>

			<p class="has-text-centered-touch">
				{{ category.description.capitalize() }}
			</p>
		</div>
	</div>

	<div v-else>
		<template v-if="loading">
			<p class="title is-3">
				Loading...
			</p>
		</template>
		<template v-else>
			<p class="title is-2">
				Category {{ id }} does not exist
			</p>
		</template>
	</div>
</template>

<script>
export default {
	name: "Category",
	props: {
		id: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			loading: true,
			category: null
		};
	},
	async mounted() {
		this.loading = true;
		this.category = await this.$store.getters.get_category(this.id);
		this.loading = false;
	},
	methods: {
		getCurreny(num) {
			let str = num.toString();
			return `$${str.substring(0, str.length - 2)}.${str.substring(str.length - 2)}`;
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
