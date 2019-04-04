<template>
	<nav v-if="range" class="pagination is-centered" role="navigation" aria-label="pagination">
		<router-link v-if="currentPage != 1" :to="{ name: $route.name, query: { ...$route.query, page: currentPage - 1 } }" class="pagination-previous" @click="$emit('changedPage', currentPage - 1)">
			Previous
		</router-link>
		<router-link v-if="currentPage != totalPages" :to="{ name: $route.name, query: {...$route.query, page: currentPage - -1 } }" class="pagination-next" @click="$emit('changedPage', currentPage - -1)">
			Next
		</router-link>

		<ul class="pagination-list">
			<li v-for="i in range" :key="i">
				<router-link :to="{ name: $route.name, query: { ...$route.query, page: (start - 1 + i) } }" class="pagination-link" :class="{ 'is-active': currentPage == (start - 1 + i) }" @click="$emit('changedPage', (start - 1 + i))">
					{{ start - 1 + i }}
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: {
		totalPages: {
			type: Number,
			required: true,
			validator: val => val && Math.abs(val) == val
		},
		pageRange: {
			type: Number,
			default: 5
		}
	},
	computed: {
		currentPage() { return this.$route.query.page || 1; },
		start() { return this.currentPage - Math.floor(this.range / 2) > 1 ? this.currentPage + Math.floor(this.range / 2) < this.totalPages ? this.currentPage - Math.floor(this.range / 2) : this.totalPages - (this.range - 1) : 1; },
		range() { return this.pageRange < this.totalPages ? this.pageRange : this.totalPages; }
	}
};
</script>
