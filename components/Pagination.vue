<template>
	<div v-if="isVisible" class="pagination">
		<NuxtLink @click="previousPage" class="link">
			<LeftArrow class="icon" />
			<p>Previous</p>
		</NuxtLink>
		<div class="buttons">
			<NuxtLink
				v-for="num in paginationButtons"
				:key="num"
				:to="`/shop?page=${num}`"
				class="page-button"
				@click="setActiveLink(num)"
				:active-class="pageNumber === num.toString() ? 'active' : ''"
			>
				{{ num }}
			</NuxtLink>
		</div>

		<NuxtLink @click="nextPage" class="link">
			<p>Next</p>
			<RightArrow class="icon" />
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
interface Props {
	filter: string;
}
const props = defineProps<Props>();
const { changePage, isVisible } = usePagination();
const route = useRoute();
const router = useRouter();
const count = useCount();
const pageNumber = ref(route.query?.page as string);
const disableLink = ref(false);
const paginationButtons = ref([1, 2, 3]);
const hidePagination = ref(true);
const page = useCookie("pageQuery", {
	default: () => "1",
});

onMounted(() => {
	page.value = route.query?.page;
	setTimeout(() => {
		if (page.value === "1") {
			changePage(+page.value);
		} else if (page.value === "2") {
			changePage(+page.value);
		} else if (page.value === "3") {
			changePage(+page.value);
		}
		router.push(`/shop?page=${page.value}`);
	}, 500);
});
const filter = useCookie("filter");
watchEffect(() => {
	if (props.filter === "Featured") {
		hidePagination.value = false;
	} else {
		hidePagination.value = true;
	}
	if (props.filter !== "Best selling") {
		paginationButtons.value = [1, 2, 3];
		return;
	}

	paginationButtons.value.pop();
});

if (parseInt(pageNumber.value) <= 0 || parseInt(pageNumber.value) > 3) {
	throw createError({
		statusCode: 404,
		statusMessage: "Not Found",
	});
}

function setActiveLink(n: number) {
	window.scrollTo(0, 0);
	pageNumber.value = n.toString();
	changePage(n);
	count.value = n;
}

function previousPage() {
	if (count.value <= 1) {
		return;
	}

	count.value--;
	changePage(count.value);
	pageNumber.value = `${count.value}`;
	router.push(`/shop?page=${count.value}`);
	window.scrollTo(0, 0);
}
watch(count, (newValue) => {
	pageNumber.value = `${newValue}`;
});
function nextPage() {
	if (count.value >= 3) {
		return;
	}
	if (count.value === 2 && paginationButtons.value.length === 2) {
		return;
	}
	count.value++;

	changePage(count.value);
	disableLink.value = false;
	pageNumber.value = `${count.value}`;
	router.push(`/shop?page=${count.value}`);
	window.scrollTo(0, 0);
}

if (
	route.query?.page === "3" &&
	(filter.value === "Featured" || filter.value === "Best selling")
) {
	throw createError({
		statusCode: 404,
		statusMessage: "Not Found",
		fatal: true,
	});
}
</script>

<style scoped>
.disableLink {
	pointer-events: none;
	cursor: default;
	opacity: 0.6;
}
.none {
	display: none !important;
}
.pagination {
	display: flex;
	align-items: center;
	gap: 1.5rem;
	align-self: center;
}
.pagination .link {
	font-size: 0.85rem;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.3rem;
}

.pagination .link .icon {
	height: 0.5rem;
	width: 0.5rem;
}
.pagination .link:hover {
	text-decoration: underline;
}
.buttons {
	display: flex;
	gap: 0.5rem;
}
.pagination .page-button {
	border-radius: 50%;
	border: 1px solid rgb(202, 202, 202);
	font-weight: 700;
	width: 2.5rem;
	height: 2.5rem;
	background: 0;
	transition: 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	text-decoration: none;
	font-size: 0.9rem;
}

.pagination .page-button:hover {
	background-color: black;
	color: white;
}
.pagination .active {
	color: white;
	background: rgb(0, 0, 0);
	pointer-events: none;
}
</style>
