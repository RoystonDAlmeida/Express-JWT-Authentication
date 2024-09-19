// Creating a simple ORM schema using mongoose
const mongoose=require('mongoose')

// Using mongoose to create an ORM model
const userSchema=new mongoose.Schema({
	name:{ type:String, unique:true, required:true},
	email: {type:String, unique:true, required:true},
	password:{ type:String, required:true},
})

// Make the ORM model schema available for export
module.exports=mongoose.model('User',userSchema)
