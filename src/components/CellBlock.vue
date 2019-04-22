<template>
  <div class="cell"
    :class="color + (readOnly ? ' read-only' : '')"
    @click="updateCellType"
    @mouseover.ctrl="updateCellType"
  ></div>
</template>

<script>
import store from '../store'

export default {
  name: 'CellBlock',
  props: {
    value: Object,
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    color() {
      if (this.value.type === 0)
        return 'black'
      else if(this.value.type === 1)
        return 'yellow'
      else if(this.value.type === 2)
        return 'green'
      else if(this.value.type === 3)
        return 'blue'
      else if(this.value.type === 4)
        return 'red'
      else
        return 'white'
    }
  },
  methods: {
    updateCellType() {
      if(this.readOnly) return

      const {row, col} = this.value
      store.updateCellType(row, col)
    }
  }
}
</script>

<style>
  .white {
    background: #ddd; 
  }
  .black {
    background: #333;
    color: #ddd;
  }
  .red {
    background: #f55;
    color: #333;
  }
  .blue {
    background: #55f;
    color: #ddd;
  }
  .green {
    background: #5d5;
    color: #333;
  }
  .yellow {
    background: #dd5;
    color: #333;
  }
  .cell {
    width: 1em;
    height: 1em;
    border: 1px solid #111;
    margin: 0;
    padding: 0;
    transition: 256ms
  }
  .cell:not(.read-only) {
    cursor: pointer;
  }
  .cell.read-only {
    cursor: default;
  }
</style>
