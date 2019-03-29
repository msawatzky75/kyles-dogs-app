<template>
	<div class="columns">
		<div class="column">
			<p class="title">
				{{ title }}
			</p>

			<p>{{ content }}</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			title: null,
			content: null
		};
	},
	watch: {
		async $route() {
			await this.getPage();
		}
	},
	async mounted() {
		await this.getPage();
	},
	methods: {
		async getPage() {
			let target = this.$route.meta.title.toLowerCase();
			let data = (await (await fetch(`${this.$store.state.api}/pages`)).json()).find(p => p.title.toLowerCase() == target);
			if (data) {
				this.title = data.title;
				this.content = data.content;
			}
		}
	}
};
</script>
