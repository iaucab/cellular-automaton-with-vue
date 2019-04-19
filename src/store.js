import Vue from 'vue'

export default {
  debug: true,
  table: [],
  cellType: .2,
  
  setCellPiker(newValue) {
    // eslint-disable-next-line
    if (this.debug) console.log(`setCellPiker to ${newValue}`)
    this.cellType = newValue
  },

  updateCellType(row, col) {
    // eslint-disable-next-line
    if (this.debug) console.log(`updateCellType table[${row}][${col}]=${this.cellType}`)
    Vue.set(this.table[row][col], 'current', this.cellType)
  },

  updateNextCell(row, col, newValue) {
    // eslint-disable-next-line
    if (this.debug) console.log(`updateNextCell table[${row}][${col}]=${newValue}`)
    Vue.set(this.table[row][col], 'next', newValue)
  },

  changeCurrentToNext() {
    // eslint-disable-next-line
    if (this.debug) console.log(`changeCurrentToNext`)

    for (let i = 0; i < this.table.length; i++) {
      const row = this.table[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        Vue.set(cell, 'current', cell.next)
        Vue.set(cell, 'next', 0)
      }
    }
  }
}