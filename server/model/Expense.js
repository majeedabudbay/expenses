const moment = require("moment")

const mongoose = require('mongoose')
const Schema = mongoose.Schema




const expenseSchema = new Schema({
  name: String,
  amount: Number,
  date: moment().format('MMMM Do YYYY, h:mm:ss a'),
  group: String
})


const Expense = mongoose.model("expense", expenseSchema)


module.exports = Expense