const History = require('../models/history')

async function handleCreateHistory(req,res) {
    try{
        const {credits ,title } = req.body;
        await History.create({
            credits:credits,
            title:title
        })

        res.json({status:true,message:'created sucessfully' });
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while creating history' , error : err});
    }
}


async function handleDeleteHistory(req,res) {
    try{
        const result = await History.deleteMany({})
        res.json({status: true , message:"history deleted", deletecount : result.deletedCount });
    }catch(err){
        console.error(err);
        res.json({status:false,message:'error while deleting the card' , error : err});
    }
}

async function handleFetchFullHistory(req,res) {
    try{
        const fullHistory = await History.find();
        res.json({status:true,message:'success',data: fullHistory });
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while fetching all card' , error : err});
    }
}


module.exports = {
    handleCreateHistory,
    handleDeleteHistory,
    handleFetchFullHistory
}