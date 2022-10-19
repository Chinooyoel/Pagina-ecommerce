class Generics {
	async findOne( model, filter ) {
		return await model.findOne({where: filter});
	}

	async get( model, filter ) {
		return await model.findAll({where:filter});
	}
    
	async save( model, modelToSave ) {
		return await model.create(modelToSave);
	}
    
	async update( model, modelToUpdate, filter ) {
		return await model.update(modelToUpdate,{where: filter});
	}
    
	async delete( model, filter ) {
		return await model.find({where: filter});
	}

}


module.exports = Generics;