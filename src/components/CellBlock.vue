<template>
  <div class="cell"
    :class="color"
    @click="updateCellType"
    @mouseover.ctrl="updateCellType"
  ></div>
</template>

<script>
import store from '../store'

export default {
  name: 'CellBlock',
  props: {
    value: Object
  },
  computed: {
    color() {
      if (this.value.current < .1)
        return 'black'
      else if(this.value.current < .3)
        return 'yellow'
      else if(this.value.current < .5)
        return 'green'
      else if(this.value.current < .8)
        return 'blue'
      else
        return 'red'
    }
  },
  methods: {
    updateCellType() {
      const {row, col} = this.value
      store.updateCellType(row, col)
    }
  }
}
</script>

<style>
  .black {
    background: #333;
  }
  .red {
    background: #f55;
  }
  .blue {
    background: #55f;
  }
  .green {
    background: #5d5;
  }
  .yellow {
    background: #dd5;
  }
  .cell {
    width: 1em;
    height: 1em;
    border: 1px solid #111;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
</style>
