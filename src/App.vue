<template>
  <div id="app">
    <img alt="IA UCAB logo" src="./assets/logo.jpg">
    <h1>AI UCAB</h1>
    <h2>Cellular automaton</h2>
    <div class="flex justify-center items-center pb-1">
      <CellPiker class="mr-1" />
      <button @click="isRunning = !isRunning">
        {{ isRunning ? 'stop' : 'start' }} 
      </button>
    </div>
    <div style="border: 1px solid #111">
      <DivRow v-for="(row, index) in table"
        :cells="row"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import DivRow from './components/DivRow.vue'
import CellPiker from './components/CellPiker.vue'
import store from './store'

export default {
  name: 'app',
  data() {
    return {
      isRunning: false,
      dimension: 25,
      table: undefined
    }
  },
  beforeMount() {
    this.table = store.table
    for (let i = 0; i < this.$data.dimension; i++) {
      const row = []
      for (let j = 0; j < this.$data.dimension; j++) {
        row.push({
          row: i,
          col: j,
          current: 0, // current: Math.random(),
          next: 0
        })
      }
      this.$data.table.push(row)
    }
  },
  components: {
    DivRow, CellPiker
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: monospace, 'Courier New', sans-serif;
  font-size: 16px;
  text-align: center;
  color: #2c3e50;
  padding: 1em;
  margin: 0 auto;
}
#app img {
  max-width: 10em;
}
.pb-1 {
  padding-bottom: 1em;
}
.mr-1 {
  margin-right: 1em;
}
</style>
