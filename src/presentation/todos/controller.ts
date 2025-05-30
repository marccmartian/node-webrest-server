import { Request, Response } from "express";

let todos = [
    {id: 1, text: 'Buy milk', completedAt: new Date()},
    {id: 2, text: 'Buy bread', completedAt: null},
    {id: 3, text: 'Buy butter', completedAt: new Date()},
]

export class TodosController {

    // DI (repositorio)
    constructor(){}

    // Este es un metodo normal (no es de express), los argumentos si son de exoress
    public getTodos = (req: Request, res: Response) => {
        // return res.json(todos)
        res.json(todos)
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;  // ese '+' convierte de string a number
        if(isNaN(id)) res.status(400).json({error: 'Id is not a number'});

        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo) 
            : res.status(404).json({ error: `Todo with id ${id} not found`});      
    }

    public createTodo = (req: Request, res: Response) => {
        // const body = req.body
        // todos.push(body)
        // res.json(body)

        const { text } = req.body;
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null
        }

        if(!text) res.status(400).json({error: 'Text property is requied'});       
        todos.push(newTodo);

        res.json(newTodo);
    }


    // aqui se actualiza un todo por referencia, es decri lo que se actualiza es la referencia (en memoria)
    // eso no deberia de hacerse cuando se trabaja con BD
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'Id is not a number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});

        const {text, completedAt} = req.body;
        
        todo!.text = text || todo?.text;
        (completedAt === 'null')
            ? todo!.completedAt = null 
            : todo!.completedAt = new Date(completedAt || todo?.completedAt)

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if(isNaN(id)) res.status(400).json({error: 'Id is not a number'});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) res.status(404).json({error: `Todo with id ${id} not found`});

        // se puede hacer con filter tbn, pero esta forma esta muy buena
        todos.splice(todos.indexOf(todo!), 1);
        res.json(todo);
    }

}

// la logica del update: 
// si no mando el texto, se queda con el anterior
// si mando la fecha nula, se borra, pero si no mando fecha se queda con la anterior