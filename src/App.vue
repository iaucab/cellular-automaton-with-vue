<template>
  <div id="app">
    <img alt="IA UCAB logo" src="./assets/logo.jpg">
    <h1>AI UCAB</h1>
    <h2>Cellular automaton</h2>
    <div class="flex justify-center items-center pb-1">
      <CellPiker class="mr-1" />
      <button @click="isRunning ? stop() : start()">
        {{ isRunning ? 'stop' : 'start' }} 
      </button>
    </div>
    <div class="table"
      :style="'width: '+18*dimension+'px'">
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
import { setInterval, clearInterval } from 'timers';

export default {
  name: 'app',
  data() {
    return {
      isRunning: false,
      dimension: 25,
      filter: [
        [.2,  .3, .4],
        [.1,  1,  .1],
        [.4,  .3, .2]
      ],
      table: undefined,
      idLoop: undefined,
      timer: 1024
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
  methods: {
    start() {
      this.$data.isRunning = true

      this.updateNexts()
      store.changeCurrentToNext()
      
      this.$data.idLoop = setInterval(() => {
        this.$nextTick(() => {
          this.updateNexts()
          store.changeCurrentToNext()
        })
      }, this.$data.timer)
    },
    stop() {
      this.$data.isRunning = false
      clearInterval(this.$data.idLoop)
    },
    updateNexts() {
      const amplitude = Math.floor(this.$data.filter.length / 2)

      // Table
      const table = this.$data.table
      for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
          var sum = 0
          
          // Filter
          const filter = this.$data.filter
          for (let frow = 0; frow < filter.length; frow++) {
            for (let fcol = 0; fcol < filter[frow].length; fcol++) {
              const fvalue = this.$data.filter[frow][fcol]
              let rowAdjacent = row + frow - amplitude
              let colAdjacent = col + fcol - amplitude
              
              sum += this.getAdjacent(rowAdjacent, colAdjacent) * fvalue
            }
            
          }

          // Reactive method
          // store.updateNextCell(row, col, sum)
          
          // Not reactive. I do not need the reactive method 
          // because the next value does not show in the view
          table[row][col].next = sum
        }        
      }
    },
    getAdjacent(row, col) {      
      if(row < 0 || col < 0 || row >= this.$data.dimension || col >= this.$data.dimension)
        return 0
      else {
        return this.$data.table[row][col].current
      }
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
#app .table {
  border: 1px solid #111;
  margin: 0 auto;  
}
.pb-1 {
  padding-bottom: 1em;
}
.mr-1 {
  margin-right: 1em;
}
</style>
