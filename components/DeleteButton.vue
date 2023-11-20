<template>
	<button :disabled="pending" @click="deleteOrderItem">
		<TrashIcon v-if="!pending" class="icon" />
		<Spinner v-else />
	</button>
</template>
<script setup lang="ts">
interface Props {
	id: string;
}
const { id } = defineProps<Props>();

const supabase = useSupabaseClient();
const pending = ref(false);

const deleteOrderItem = async () => {
	pending.value = true;
	await supabase.from("order_item").delete().eq("id", id);
	await refreshNuxtData();
	pending.value = false;
};
</script>
<style scoped></style>
