const express = require('express')
const router = express.Router()
const moment = require('moment')
const Expense = require('../models/Expense')




router.get('/sanity', function(req, res){
    res.send("Ok!")
})


router.get('/expenses', function (req, res){
    Expense.find({}, function(err, expenses){
        res.send(expenses)
    })
    
})



router.post('/new', function (req, res){


    const name = req.body.name
    const amount = req.body.amount
    const group = req.body.group
    const date = moment().format('MMMM Do YYYY, h:mm:ss a')
   
    const expense = new Expense({ name: name, amount: amount, group: group, date: date })
    expense.save()
    res.send(expense)
})




router.put('/update/:group1/:group2', function (req, res) {
    const group1 = req.params.group1
    const group2 = req.params.group2
    Expense.findOneAndUpdate({ group: group1 }, { $set: { group: group2 } }, { new: true }, function (err, expense) {
        res.send(`The name of the expense changed: ${expense["name"]}, group
        changed to : ${group2}`)
    })
})



router.get('/expenses/:group', function (req, res) {
    const group = req.params.group
    const total = req.query.total
    if (total) {
        Expense.aggregate([
            { $match: { "group": group } }
            
        ], function (err, result) {
            res.send(`Total: ${result[0].total}`)
        })
    } 
})



module.exports = router
