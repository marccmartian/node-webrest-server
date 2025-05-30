import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    // DI
    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){
        // public folder
        this.app.use(express.static(this.publicPath));

        // MIDDLEWARES
        this.app.use(express.json());       // raw
        this.app.use(express.urlencoded({extended: true}));     //x-www-from-urlencoded

        // ROUTES
        this.app.use(this.routes);
        

        // cualquier ruta del spa servira a...
        this.app.get(/.*/, (req, res) => {
            // del directorio de mi archivo actual ve hasta el index.html
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile(indexPath);
        });


        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port} 😎`);      
        })
    }

}