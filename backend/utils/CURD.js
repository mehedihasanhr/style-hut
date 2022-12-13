 
 class CRUD {
    constructor(model){
        this.model = model;

        this.createOne = this.createOne.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
    }

    // create a new document
    async createOne(req, res) {
        const data = req.body;
        try{
            const doc = await this.model.create(data);

            if(!doc){
                return res.status(400).json({message: 'Bad request', error: true});
            } 

            // send response with the created document
            return res.status(201).json({
                message: 'Created successfully',
                data: doc,
                error: false
            });
        } catch(err){
            return res.status(500).json({message: err.message});
        }
    }


    // get all documents
    async getAll(req, res) {
        try{
            // pagination  
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            
            // get all documents
            const docs = await this.model.find().skip(skip).limit(limit);

            if(!docs) {
                return res.status(404).json({message: 'Not found', error: true});
            }

            // send response with the documents
            return res.status(200).json({
                message: "success",
                error: false,
                data: docs
            })
        }catch(error) {
            console.log(error);
        }
    }


    // get one document
    async getOne(req, res) {
        const id = req.params.id;
        try{
            const doc = await this.model.findById(id);

            // if not found send 404
            if(!doc) {
                return res.status(404).json({message: 'Not found', error: true});
            }

            // send response with the document
            return res.status(200).json({
                message: "success",
                error: false,
                data: doc
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({message: err.message, error: false});
        }
    }

    // update one document
    async updateOne(req, res) {
        const id = req.params.id;
        const data = req.body;
        try{
            if(!id || !data) {
                return res.status(400).json({message: 'Bad request', error: true});
            }

            const doc = await this.model.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true
            });

            // if not found send 404 
            // if not updated send 400
            if(!doc) {
                return res.status(404).json({message: 'Not found', error: true});
            }

            // send response with the updated document
            return res.status(200).json({
                message: "updated successfully",
                error: false,
                data: doc
            });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message: err.message, error: false});
        }
    }

    // delete one document
    async deleteOne(req, res) {
        const id = req.params.id;
        try{
            if(!id) {
                return res.status(400).json({message: 'Bad request', error: true});
            }

            const doc = await this.model.findByIdAndDelete(id);

            // if not found send 404
            if(!doc) {
                return res.status(404).json({message: 'Not found', error: true});
            }

            // send response with the deleted document
            return res.status(200).json({
                message: "deleted successfully",
                error: false,
                data: doc
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({message: err.message, error: false});
        }
    }   
 }


module.exports = CRUD;
