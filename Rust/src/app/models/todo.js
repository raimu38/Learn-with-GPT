const mongoose = require('mongoose')

const todoSheme = new mongoose.Scheme({
	title:{type:String, required:true},
	description:{type:String, required:true},
	dueDate:{type:Date, required:true},
	status:{type:String, enum:['まだやってない','継続中', '完了'], default:'まだやってない'}},{timestamp: true});


module.exports = mongoose.model('Todo',todoSheme);
git ssh でエラー:


