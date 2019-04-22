<template>
  <div class="flex items-center">
    <CellBlock :value="sample"
      :readOnly="true"
      class="mr-1"
    />
    <select v-model="cellType"
      :class="cellType"
    >
      <option v-for="type2 in types"
        :key="type2"
        :class="type2"
        :value="type2"
      >
        {{ type2 }}
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
      cellType: 'red'
    }
  },
  computed: {
    sample() {
      var type;

      if (this.$data.cellType === 'black')
        type = 0
      else if(this.$data.cellType === 'yellow')
        type = 1
      else if(this.$data.cellType === 'green')
        type = 2
      else if(this.$data.cellType === 'blue')
        type = 3
      else if(this.$data.cellType === 'red')
        type = 4
      
      store.setCellPiker(type)
      return {type, next: 0}
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
