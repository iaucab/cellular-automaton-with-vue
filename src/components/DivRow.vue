<template>
  <div class="flex justify-center">
    <CellBlock v-for="(cell, index) in cells"
      :value="cell"
      :key="index"
    />
  </div>
</template>

<script>
import CellBlock from './CellBlock.vue'

export default {
  name: 'DivRow',
  props: {
    cells: Array
  },
  components: {
    CellBlock
  }
}
</script>

<style>
  .flex {
    display: flex
  } 
  .justify-center {
    justify-content: center
  }
</style>
