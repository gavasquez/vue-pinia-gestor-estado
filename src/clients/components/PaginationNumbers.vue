<script setup lang="ts">
import { toRef, ref, watch } from 'vue';


interface Props {
  currentPage: number, 
  totalPages: number,
}

interface Emits {
  (e: 'pageChange', page: number): void,
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

const totalPages = toRef(props, 'totalPages');
const currentPage = toRef(props, 'currentPage');

const totalPageNumber = ref<number[]>([]);


watch(totalPages, () => {
  totalPageNumber.value = [...new Array(totalPages.value)].map((v, i) => i + 1 )
}, { immediate: true});

</script>

<template>
  <div>
    <button 
      :disabled="currentPage === 1" 
      @click="emits('pageChange', currentPage-1)">
      Anterior
    </button>
    <button 
      v-for="item of totalPageNumber" 
      :key="item" 
      @click="emits('pageChange', item)"
      :class="{ active: currentPage === item}">
      {{ item }}
    </button>
    <button 
      :disabled="currentPage === totalPages" 
      @click="emits('pageChange', currentPage+1)">
      Siguiente
    </button>
  </div>
</template>

<style scoped>
div {
  margin-top: 10px;
}

button{
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  padding: 10px;
  transition: all .5s;
  margin-right: 5px;
}

button:hover {
  background-color: hsla(160, 100%, 35%, 0.2);
  transition: all .5s;
}

button:disabled {
  cursor: not-allowed;
}

.active {
  background-color: hsla(160, 100%, 35%, 0.2);
}
</style>