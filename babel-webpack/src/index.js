import './styles/styles.css'
const date = new Date()
const day = date.getDate()
const month = date.getMonth()+1
const fullYear = date.getFullYear()
console.log(`Today is: ${day}/${month}/${fullYear}`)