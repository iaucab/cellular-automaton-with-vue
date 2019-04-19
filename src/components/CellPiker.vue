<template>
  <div class="flex items-center">
    <CellBlock :value="sample"
      :readOnly="true"
      class="mr-1"
    />
    <select v-model="cellType">
      <option v-for="type in types"
        :key="type"
        :class="type"
        :value="type"
      >
        {{ type }}
      </option>
    </select>
  </div>
</template>

<script>
import CellBlock from './CellBlock.vue'
import store from '../store'

export default {
  name: 'CellPiker',
  data() {
    return {
      types: [
        'black',
        'red',
        'blue',
        'green',
        'yellow'
      ],
      cellType: 'yellow'
    }
  },
  computed: {
    sample() {
      var current;

      if (this.$data.cellType === 'black')
        current = 0
      else if(this.$data.cellType === 'yellow')
        current = .2
      else if(this.$data.cellType === 'green')
        current = .4
      else if(this.$data.cellType === 'blue')
        current = .6
      else                           // Red
        current = 1
      
      store.setCellPiker(current)
      return {current, next: 0}
    }
  },
  components: {
    CellBlock
  }
}
</script>

<style>
  .flex {
    display: flex;
  }
  .items-center {
    align-items: center;
  }
</style>
