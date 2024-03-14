const express=require('express');
const colors=require('colors')
const cors=require('cors');
const db=require('./db');
const port=process.env.PORT

app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Enpoints teste.
app.get('/',(req,res)=>res.json("welcome to our api server"))

// Enpoints ->tous les produits en DBase
app.get('/api/v1/produits', (req,res)=>{
    const sql="SELECT*FROM liste"
    db.query(sql, (err, result)=>{
        if(err)throw err
        return res.json(result)
    });
});


// Endpoints -> recuperer un produit en DB
app.get('/api/v1/produit/:id', (req,res)=>{
    const produitId=req.params.id
    const sql=`SELECT*FROM liste WHERE id=${produitId}`;
    db.query(sql, (err, result)=>{
        if(err) throw err;
        res.status(200).json({message:"operation reussite",data:result})
    })
    
})



//Endpoint  ->Ajouter un produit dans la `liste`
app.post('/api/v1/produit', (req,res)=>{
    let produit=req.body;
    const sql="INSERT INTO liste SET ?";
    db.query(sql, produit,(err, result)=>{
        if(err)throw err;
        return res.status(200).send(result)
    })
})

// Endpoints  ->Modifier un produit dans la DB
app.put('/api/v1/produit/:id', (req, res)=>{
    let produit=req.body;
    const sql=`UPDATE liste SET ? WHERE id=${req.params.id}`;
    db.query(sql,produit ,(err, result)=>{
        if(err) throw err;
       res.status(200).send(result)
    })
    
})

// Endpoints -> Supprimer un produit dans la DB
app.delete('/api/v1/produit/:id', (req,res)=>{
    const sql=`DELETE FROM liste WHERE id=${req.params.id}`;
    db.query(sql, (err, result)=>{
        if(err)throw err;
        res.status(200).json({message:'Suppression reusssite !',data:result})
    })
})






app.listen(port, ()=>{
    console.log(`Serveur lancée sur le port:${port}`.underline.red)
})
