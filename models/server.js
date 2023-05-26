const express = require('express')
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios'

        this.middlewares();
        this.routes();
        this.conectarDB();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
        });
    }
}

module.exports = Server