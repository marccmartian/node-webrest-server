import express from 'express';
import path from 'path';


export class Server {

    private app = express();

    async start(){
        // public folder
        this.app.use(express.static('public'));
        

        // cualquier ruta del spa servira a...
        this.app.get(/.*/, (req, res) => {
            // del directorio de mi archivo actual ve hasta el index.html
            const indexPath = path.join( __dirname + '../../../public/index.html' );
            res.sendFile(indexPath);
        });


        this.app.listen(3000, () => {
            console.log(`Server running on port ${3000} 😎`);      
        })
    }

}