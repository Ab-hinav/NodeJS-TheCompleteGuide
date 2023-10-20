
import * as fs from 'fs';
import { IncomingHttpHeaders, ServerResponse } from 'http';

export function reqHandler(req:IncomingHttpHeaders,res:ServerResponse){

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
        //@ts-ignore
        req.on('data',(chunk: any) =>{
            body.push(chunk);
        });
        //@ts-ignore
        return req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message,err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();

            });
        })
    }

    if(req.method=='GET' && req.url==='/message'){

        fs.readFile('message.txt',(err,data) => {
            res.write(data);
            return res.end();
        });
        
        return;
    }

    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.write('<h1>Hello World</h1>');
    res.end();




}