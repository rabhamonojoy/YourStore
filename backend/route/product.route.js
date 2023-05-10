const express=require("express")
const {ProductModel}=require("../model/product.model")
const {CartModel}=require("../model/cart.model")
const productRouter=express.Router()

productRouter.get("/",async(req,res)=>{
    let allproduct = await ProductModel.find()
    res.send(allproduct)
})

productRouter.post("/addnew",async(req,res)=>{
    try {
        let title = req.body.title;
        let pro = await ProductModel.find({title})
        if(pro.length!==0 && pro[0].title == title){
            res.send({"msg":"Product already present"});
        }
        else{
            let newpro = new ProductModel(req.body)
            await newpro.save();
            res.send({"msg":"Product Added"})
        }
    } catch (error) {
        res.send(`${error}`)
    }
    
})
productRouter.patch("/update/:id", async (req,res)=>{
    const Id = req.params.id;
    const udata=req.body;
    try{
        await ProductModel.findByIdAndUpdate({_id:Id},udata);
        res.send({"msg":"Product updated"})
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

productRouter.delete("/delete/:id", async (req,res)=>{
    const noteID=req.params.id
    await ProductModel.findByIdAndDelete(noteID)
    res.send({"msg":"Product Deleted from Database!"});
})


module.exports={
    productRouter
}