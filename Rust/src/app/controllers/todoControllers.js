const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
	try{
		const todos = await Todo.find();
		res.status(200).json(todos);
	} catch (error){
		res.status(500).json({message:'タスクの取得に失敗しました。', error});
	}
};


exports.createTodo = async (req, res) => {
	try {
		const {title, description, dueDate, status} = req.body;
		const newTodo = new Todo({ title, description, dueDate, status});
		const saveTodo  = await newTodo.save();
		res.status(201).json(saveTodo);
	} catch(error){
		res.status(500).json({message:'タスクの作成に失敗しました', error});
	

				
