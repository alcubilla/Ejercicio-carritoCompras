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
         sales:0,
          ...req.body,
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
    }else res.sendStatus(404);
  });

//actualizar 
  ADMIN.put('/:id',(req,res)=>{
    const product= Data.find(p => p.id === req.params.id);
    if(product){
        product= {...req.body}
        res.json(Data);
    }else res.status(404).send("NO SE ENCONTRO EL ARTICULO A MODIFICAR");
  });
 
  //ventas
  ADMIN.get('/shop',(req,res) =>{
    res.render('sales',{store,Data});
  });


  }