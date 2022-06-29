const Model = require('./model')

module.exports.todoController = {
    postTodo: async (req, res) =>{
        try{
            const data = await Model.create({
                text: req.body.text
            })
            res.json(data)
        }catch (err) {res.json(err)}
    },

    delTodo: async (req, res)  =>{
        try {
            await Model.findByIdAndDelete(req.params.id)
            res.json('task is deleted')
        }catch (err) {
            res.json(err)
        }
    },

    getTodo: async (req, res) =>{
        try{
           const task =  await Model.find()
            res.json(task)
        }catch (err) {res.json(err)}
    },
    patchTodo: async (req, res) =>{
        try{
            const data = await Model.findByIdAndUpdate(req.params.id, {
                completed: req.body.completed
                
            }, {new: true})
            
            res.json(data)
        }catch (err) {res.json(err)}
    }
}

