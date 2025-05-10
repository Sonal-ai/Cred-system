const Card = require("../models/cards");

async function handleCreateCard(req,res) {
    try{
        const {title,description,credits} = req.body;
        await Card.create({
            title:title,
            description:description,
            credits:credits,
        })
        // return res.redirect('/')
        res.json({status:true,message:'created sucessfully' });
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while creating new card' , error : err});
    }
}

async function handleFetchAllCards(req,res) {
    try{
        const allCards = await Card.find();
        res.json({status:true,message:'finded sucessfully',data: allCards });
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while fetching all card' , error : err});
    }
}

async function handleDeleteCard(req,res) {
    try{
        const {id} = req.params;
        await Card.findByIdAndDelete(id);
        res.json({status: true , message:"card deleted successfully"});
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while deleting the card' , error : err});
    }
} 

// async function handleEditCard(req,res) {
//     try{
//         const {id} = req.params;
//         const updated = await Card.findByIdAndUpdate(id, req.body, {new:true});
//         res.json(updated);

//     }catch(err){
//         res.json({status:false,message:'error while editing card' , error : err});
//     }
// }

module.exports = {
    handleCreateCard,
    handleFetchAllCards, 
    handleDeleteCard
}