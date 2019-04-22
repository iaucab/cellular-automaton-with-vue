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
      dimension: undefined,
      filter: [
        [.75, 1, .75],
        [1, .25, 1],
        [.75, 1, .75]
      ],
      table: undefined,
      idLoop: undefined,
      timer: 1024
    }
  },
  created() {
    if(window.innerWidth < 350)
      this.$data.dimension = 9
    else if(window.innerWidth < 570)
      this.$data.dimension = 15
    else if(window.innerWidth < 780)
      this.$data.dimension = 21
    else if(window.innerWidth < 1024)
      this.$data.dimension = 31
    else
      this.$data.dimension = 41
    //this.$data.dimension = 5
  },
  beforeMount() {
    this.table = store.table
    for (let i = 0; i < this.$data.dimension; i++) {
      const row = []
      for (let j = 0; j < this.$data.dimension; j++) {
        row.push({
          row: i,
          col: j,
          type: 0,
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
          const types = [0,0,0,0,0]
          
          // Filter
          const filter = this.$data.filter
          for (let frow = 0; frow < filter.length; frow++) {
            for (let fcol = 0; fcol < filter[frow].length; fcol++) {
              const fvalue = this.$data.filter[frow][fcol]
              let rowAdjacent = row + frow - amplitude
              let colAdjacent = col + fcol - amplitude
              const type = this.getAdjacent(rowAdjacent, colAdjacent)
              
              types[type] += 1 * fvalue
            }
            
          }

          // Remove 0: black blocks
          table[row][col].next = this.getBestType(table[row][col].type, types.slice(1))
        }        
      }
    },
    getAdjacent(row, col) {      
      if(row < 0)
        row = this.$data.dimension-1
      if(col < 0)
        col = this.$data.dimension-1
      if(row >= this.$data.dimension)
        row = 0
      if(col >= this.$data.dimension)
        col = 0
      
      return this.$data.table[row][col].type
    },
    getBestType(current, types) {
      const copy = [...types]
      
      types.sort((a,b) => b-a)
      const best = types[0]
      const second = types[1]

      // die if have 2 types with same value
      if(best === second)
        return 0

      if (Math.round(best) === 3 || (current !== 0 && Math.round(best) === 2))
        return copy.indexOf(best) +1
      else
        return 0
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
  max-width: 100vw;
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
#app button, #app select {
  padding: .25em .5em;
  border: 1px solid #111;
  outline: none;
}
#app button {
  background: #fff;
}
.pb-1 {
  padding-bottom: 1em;
}
.mr-1 {
  margin-right: 1em;
}
</style>
