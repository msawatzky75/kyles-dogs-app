<template lang="html">
	<div class="card">
		<div class="card-header">
			<p class="card-header-title">
				{{ category.name.capitalize() }}
			</p>
		</div>

		<div class="card-content">
			<p>{{ category.description.capitalize() }}</p>
		</div>

		<div class="card-footer">
			<div class="card-footer-item">
				<router-link :to="{ name: 'category', params: { id: category.id } }">
					View category
				</router-link>
			</div>

			<div class="card-footer-item">
				<router-link :to="{ name: 'products', query: { category: category.id } }">
					View products
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Category",
	props: {
		category: {
			type: Object,
			required: true
		}
	}
};
</script>
