import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

// si tienes una clase que no va a recibir dependencias puedes usar metodos staticos
export class AppRoutes {

    static get routes(): Router {
        const router = Router();
        // const todoController = new TodosController()

        // se pasa la referencia, por eso no es necesario escribir los parametros
        // router.get('/api/todos', (req, res) => todoController.getTodos(req, res));
        // router.get('/api/todos', todoController.getTodos);

        router.use('/api/todos', TodoRoutes.routes)

        return router;
    }

}