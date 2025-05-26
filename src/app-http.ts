// este server usa el protocolo HTTP, pero hay mas como: https y de momento el http2
// lo puedes importar de la misma manera

import fs from 'fs';
import http from 'http'

const server = http.createServer((req, res) => {
    // cualquier url va a devolver algo
    console.log(req.url);

    // ejm1 : devuelve cualquier cosa
    // res.write('Hello world');
    // res.end();
    
    // ejm2: Esto seria un server side render
    // res.writeHead(200, {'content-type': 'text/html'});
    // res.write(`<h1>My Url: ${req.url} </h1>`);
    // res.end();

    // ejm3: tipico ejm de un rest server
    // const data = {name: 'Marvin', age: 40, city: 'New York'}
    // res.writeHead(200, {'content-type': 'application/json'});
    // res.end(JSON.stringify(data))

    // ejm4
    // if (req.url === "/") {
    //     const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    //     res.writeHead(200, {'content-type': 'text/html'});
    //     res.end(htmlFile);
    // } else {
    //     res.writeHead(404, {'content-type': 'text/html'});
    //     res.end();
    // }

    // ejm5
    if (req.url === "/") {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(htmlFile);
        return
    }
    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'content-type': 'application/javascript'});

    } else if(req.url?.endsWith('.css')) {
        res.writeHead(200, {'content-type': 'text/css'});
    }

    const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
    res.end(responseContent);
})

server.listen(8080, () => {
    console.log("Server running on port 8080"); 
})


