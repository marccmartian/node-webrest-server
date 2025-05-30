import { Server } from "./presentation/server";
import { envs } from './config/envs'
import { AppRoutes } from "./presentation/routes";


(() => {
    main();
})();

function main(){    

    // const server = new Server()
    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes    // DI
    })

    server.start();    
    
}