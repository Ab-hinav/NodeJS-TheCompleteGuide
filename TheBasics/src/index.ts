import * as http from 'http';
import * as fs from 'fs';

const server:http.Server  = http.createServer(function (req:http.IncomingMessage,res:http.ServerResponse){
    
    if (req.url === '/'){
        res.write('<html>');
        res.write('Please Submit a form');
        res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    let message:string = 'Hello World';
    if(req.method==='POST' && req.url==='/message'){
        const body:any = [];
        req.on('data',(chunk) =>{
            body.push(chunk);
        });
        return req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
        })
    }

    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.write('<h1>Hello World</h1>');
    res.end();
    // process.exit(0);
});

server.listen(3000);
