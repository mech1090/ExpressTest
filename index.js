const express  = require('express')
require('dotenv').config()

const app = express()
const {NOT_FOUND_MSG} = require('./constant')

const products = [
    {
      id: '1',
      name: 't-shirt',
      section: 'kids',
      size: 's',
      color: 'white'
    },
    {
      id: '2',
      name: 't-shirt',
      section: 'kids',
      size: 's',
      color: 'white'
    },
    {
      id: '3',
      name: 'pants',
      section: 'adults',
      size: 'l',
      color: 'green'
    },
    {
      id: '4',
      name: 'pants',
      section: 'adults',
      size: 'm',
      color: 'white'
    }
  ]

app.get('/',(req,res)=>{
    res.send('OK')
})

app.get('/api/v1/products',(req,res)=>{
    res.send(products)
}) 
app.get('/api/v1/products/:id',(req,res)=>{
    console.log(req.params)
   // const id = req.params.id
    const {id} = req.params
    console.log('Requested ID is', id)
})
app.get('*',(req,res)=>{
    res.status(404).send(NOT_FOUND_MSG)
})



const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

