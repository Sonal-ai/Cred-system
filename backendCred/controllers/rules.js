const Rules = require("../models/Rules");

async function handleCreateRule(req,res) {
    try{
        const {title,description,credits} = req.body;
        await Rules.create({
            title:title,
            description:description,
            credits:credits,
        })
        // return res.redirect('/')
        res.json({status:true,message:'rule created sucessfully' });
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while creating new Rules' , error : err});
    }
}

async function handleFetchAllRules(req,res) {
    try{
        const allRules = await Rules.find();
        res.json({status:true,message:'finded sucessfully',data: allRules });
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while fetching all Rules' , error : err});
    }
}

async function handleDeleteRules(req,res) {
    try{
        const {id} = req.params;
        await Rules.findByIdAndDelete({_id:id});
        res.json({status: true , message:"Rules deleted successfully"});
    }catch(err){
        console.log(err);
        res.json({status:false,message:'error while deleting the Rules' , error : err});
    }
}

async function handleEditRules(req,res) {
    try{
        const {id} = req.params;
        const updated = await Rules.findByIdAndUpdate(id, req.body, {new:true});
        res.json(updated);

    }catch(err){
        res.json({status:false,message:'error while editing Rules' , error : err});
    }
}

module.exports = {
    handleCreateRule,
    handleDeleteRules,
    handleEditRules,
    handleFetchAllRules
}