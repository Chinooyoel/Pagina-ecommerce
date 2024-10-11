import { Sequelize } from 'sequelize'
import { initModels } from '../models/init-models'

const db = new Sequelize('bleedczhq4pjujupxycw', 'root', '123456', {
	//para no ver las sentencias sql generadas por sequalize
	logging: false,
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
})

initModels(db)

export = db
