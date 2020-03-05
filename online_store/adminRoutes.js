import { v4 as uuidv4 } from 'uuid';

export default (ADMIN,Data, store) => {

  //ver elementos
  ADMIN.get('/',(req,res)=>{
    res.json(Data);  
  });

  //agrega un elemento
  ADMIN.post('/add',(req,res)=>{
    if(req.query.name && req.query.stock && req.query.value)
      {Data.push(
        {id: uuidv4(),
        name: req.query.name,
        stock: Number(req.query.stock),
        value: Number(req.query.value),
        sales:0
        });
        res.json(Data);
      }else res.send("No se ha podido agregar el producto, te faltó un elemento");     
  });
  
//borrar 
  ADMIN.delete('/:id',(req,res)=>{
    const product= Data.find(p => p.id === req.params.id);
    if(product){
    var i = Data.indexOf( product );
    i !== -1 && Data.splice( i, 1 );
    res.json(Data);
    }else{
        res.sendStatus(404);
    }
  });

//actualizar 
  ADMIN.put('/:id',(req,res)=>{
    const product= Data.find(p => p.id === req.params.id);
    if(product){
        product.name=req.body.name;
        product.value=req.body.value;
        product.stock=req.body.stock;
        res.json({status:'ok', result: Data});
    }else{
        res.status(404).send("NO SE ENCONTRO EL ARTICULO A MODIFICAR");
    }
   
  });

  ADMIN.get('/shop',(req,res) =>{
    res.send(`Total ventas ${store.total} <br> Por producto: ${Data}`);
  });

   
  }