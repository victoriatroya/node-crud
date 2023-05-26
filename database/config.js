const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
            {
                useNewUrlParser: true,
        });

        console.log('db online')
    } catch (e) {
        console.log(e);
        throw new Error('Error al inicializar bd')
    }
}

module.exports = { dbConnection }