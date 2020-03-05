export default (PRODUCTS,Data, store) => {

  //mostrar  
  PRODUCTS.get ('/', (req, res) => {
      const viewActive = Number(req.query.status) === 1;
      const activeProducts = viewActive
      ? Data.filter(p => p.stock > 0)
      : Data; //solo los productos existentes
      res.send(activeProducts);
  });

  //mostrar por id
  PRODUCTS.get('/:id',(req,res)=>{
    const product= Data.find(p => p.id === req.params.id);
    if(product){
    res.json(product);
    }else{
        res.sendStatus(404);
    }
   
  })

  //comprar
  PRODUCTS.put('/:id',(req,res)=>{
    const product= Data.find(p => p.id === req.params.id);
    if(product.stock >0 && product){
    product.stock--;
    store.total += product.value;
    product.sales +=product.value;
    console.log(store)
    res.json(product);
     
    }else{
      res.sendStatus(404);
    }
   
  })

  //borrar
  PRODUCTS.delete('/:id',(req,res)=>{
    const product= Data.find(p => p.id === req.params.id);
    if(product){
    Data = Data.filter(p => p.id !== req.params.id)
    res.json(Data);
    }else{
        res.sendStatus(404);
    }
   
  })
 
}