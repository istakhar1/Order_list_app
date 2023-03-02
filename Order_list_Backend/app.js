const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const PORT= 3001;
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(bodyParser.json());
//we have to handel json formated data for ordered list

let orders =[
    {
        order_Id: uuid.v4(),
        product_Name : 'Smart Phone',
        qty :1,
        shipping_Type :'Standerd',
        total_Amount : 4000,
        customer_Name : 'Ishu',
        dob : new Date(),
        phone: 9508629990,

    },
    {
        order_Id: uuid.v4(),
        product_Name : 'Smart Phone',
        qty :1,
        shipping_Type :'Standerd',
        total_Amount : 4000,
        customer_Name : 'Ishu',
        dob : new Date(),
        phone: 9508629990,

    }
]

//  we have to create apis to gettting order, adding order , updating order and deleting order

// api to return all the order we have

app.get('/api/orders',(req,res,next)=>{
    try{
    res.json(orders);
    }
    catch(err){
        console.log("Getting error in order view api");
        res.json(400,{msg : "Getting Error in  view order api"})
    }
})

// to add new order 

app.post('/api/orders',(req,res,next)=>{
    try{
    const newOrder = {
        order_Id:uuid.v4(),
        ...req.body
    }
    orders.push(newOrder);
    res.json(200,{msg : 'New order added',orders});
    }
    catch(err){
        console.log("Getting Error in add new order api");
        res.json(400,{msg : "Getting Error in add new order api"})
    }
})

// update the order api by unique id

app.put('/api/order/:id',(req,res,next)=>{
    // check we have that order or not;
    try{
    const id = req.params.id;
    const found = orders.some(order => order.order_Id === id);
    if(found){
        // we have to update my order ;

        orders = orders.map(order =>  order.order_Id === id ? {...order,...req.body} :order);
        console.log("Check updated order :-", orders);
        const updatedOne = orders.find(order => order.order_Id == id);
        res.json(200,{msg:"Updated Order ", updatedOne});

    }
    else{
        res.json(400,{msg:" Order not found Please provide correct order id"});
    }
    }
    catch(err){
        console.log("Getting error in order updation");
        res.json(400,{msg:"Getting error in order updation"});
    }
})


//we have to create a api for delete ord{er

app.delete('/api/order/:id',(req,res,next)=>{
    try{
    const id = req.params.id;
    const found = orders.some(order=> order.order_Id ===id);
    if(found){
        orders = orders.filter(order => order.order_Id!== id);

        res.json(200,{msg:"getting updated orders after deleting one",orders});
    }
    }
    catch(err){
        console.log("GEtting error in deletion", err);
        res.json(400,{msg:"GEtting error in deletion"});
    }

})





app.listen(PORT, (err)=>{
    if(err){
        console.log("Getting error on server runnig");
    }
    console.log(`Server started on ${PORT}`);
})