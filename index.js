const express  = require('express')

const app = express()

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

app.get('*',(req,res)=>{
    res.status(404).send('Resource Not Found')
})

app.listen(3000,()=>{
    console.log('Server running on port 3000')
})

