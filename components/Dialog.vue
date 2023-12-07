<template>
	<div @click.self="closeDialog" v-if="isOpen" class="dialog-overlay">
		<div class="dialog">
			<div class="dialog-header">
				<h2>{{ title }}</h2>
				<button class="close-button" @click="closeDialog"><CloseIcon /></button>
			</div>
			<div class="dialog-content">
				<p>{{ content }}</p>
			</div>
			<div class="dialog-buttons">
				<button class="cancel-button" @click="closeDialog">Cancel</button>
				<NuxtLink class="go-to-login" @click="closeDialog" to="/account/login">go to login</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
const { isOpen, closeDialog ,title,content } = useDialog();
</script>

<style scoped>
.dialog-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999999;
}

.dialog {
	background: #fff;
	padding: 20px;
	border-radius: 8px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	width: 400px;
	z-index: 999999;
}

.dialog-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.dialog-buttons {
	display: flex;
	justify-content: flex-end;
    gap: 1rem;
}

button {
	margin-left: 10px;
}
.close-button {
	display: flex;
	align-items: center;
	justify-content: center;
	background: 0;
	border: 0;
	transform: scale(0.9);
}

.dialog-content{
    margin-bottom: 3rem;
}
.cancel-button{
    background:0;
    padding: 0.5rem 2rem;
    border: 1px solid rgb(19, 19, 19);
}
.go-to-login{
    display: inline-block;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0.5rem 2rem;
    text-decoration: none;

}
</style>
