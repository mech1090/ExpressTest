const express  = require('express')
const req = require('express/lib/request')
const Validator = require('validatorjs')
const Joi = require('joi')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use((req,res,next)=>{
    console.log('Middleware before routes'),
    next()
})
const {NOT_FOUND_MSG, BAD_REQUEST} = require('./constant')

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
    const {limit} = req.query
    if(!limit)  return res.send(products)
    const productList =  products.slice(0,limit)
    res.send(productList)
}) 
app.get('/api/v1/products/:id',(req,res)=>{
    console.log(req.params)
   // const id = req.params.id
    const {id} = req.params
    console.log('Requested ID is', id)
    const product = products.filter(prod => prod.id === id)
    if (product.length!==0){
        res.send(product)
        console.log('product is ',product)
    }else
    {
        res.status(404).send(NOT_FOUND_MSG)
    }

})

app.get('/api/v1/products/:size/:color',(req,res)=>{
    const {size,color} = req.params
    const product = products.find(prod=>prod.size === size && prod.color=== color)
    if(product){
        res.send(product)
    } else
    {
        res.status(404).send(NOT_FOUND_MSG)
    }
})
app.get('*',(req,res)=>{
    res.status(404).send(NOT_FOUND_MSG)
})

app.post('/api/v1/products',(req,res)=>{
    const {name,size,section,color} = req.body
   /* const data = {
        name,
        section,
        size,
        color

    }*/
    const data = req.body

    const productschema = Joi.object({
        name : Joi.string().min(3).max(512).required(),
        section : Joi.string().valid('kids','adults').required(),
        size : Joi.string().valid('s','m','l').required(),
        color : Joi.string().required()
    })

    const{error,value} = productschema.validate(data)
    if(error) return res.status(400).send(error.details[0].message)
 /*   const rules = {
        name : 'required',
        section: ['required',{in:['kids','adults']}],
        size : ['required',{in:['s','m','l']}],
        color : 'required'
    }
    validator = new Validator(data,rules)
    if(validator.fails()) return res.status(400).send(validator.errors)*/
    
    const product = {
        id : products.length + 1,
        name,section,size,color  
    }
    products.push(product)
    res.send(product)
})

app.patch('/api/v1/products/:id',(req,res)=>{
    const {name,section,size,color} = req.body
    const {id} = req.params
    const index = products.findIndex(prod=>id===prod.id)
    let product = products[index]
    product = {
        id : product.id,
        name : name ? name : product.name,
        section : section ? section : product.section,
        size : size ? size : product.size,
        color : color ? color : product.color
    }

    products[index] = product
    res.send(product)
    console.log(product)    ``

})

app.delete('/api/v1/products/:id',(req,res)=>{
    const {name,section,size,color} = req.body
    const {id} = req.params
    const index = products.findIndex(prod=>id === prod.id)
    if(index === -1) return res.status(404).send(NOT_FOUND_MSG)

    const product = products.slice(index,1)
    res.send(product)
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

