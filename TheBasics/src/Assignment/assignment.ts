import * as http from 'http';
import * as fs from 'fs';
import * as readline from 'readline';
import * as path from 'path';



export const server1 = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if(url==='/' && method=='GET'){
        res.write('<html>');
        res.write('Want to add a new user');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="name"><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        res.end();
        return;
    }

    if(url==='/create-user' && method=='POST'){
        const body:any = [];
        //@ts-ignore
        req.on('data',(chunk: any) =>{
            body.push(chunk);
        });

        return req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            const name = parsedBody.split('=')[1] + '\r\n';
            console.log(parsedBody);

            fs.appendFile('./src/Assignment/users.txt',name,err => {
                if(err){
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
                }else{
                    res.statusCode = 301;
                    res.setHeader('Location','/');
                    return res.end();
                }
            });
        });
    }

    if(url==='/users' && method=='GET'){
        let cpath = path.join(__dirname,'users.txt');
        readLineByLine(cpath,res);
       return; 
    }

    if(url==='/users' && method=='DELETE'){
        const empty = '';
        fs.writeFile('./src/Assignment/users.txt',empty,(err) => {
            if(err){
                console.log(err);
            }
            res.statusCode = 200;
            res.end();
        });
    }


});



async function readLineByLine(path:string,res:http.ServerResponse){
    const fileStream = fs.createReadStream(path);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
      });
      // Note: we use the crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in input.txt as a single line break.
      res.write('<html>');
     
      for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
        res.write('<body><ul><li>'+line+'</li></ul></body>');
      
      }
      res.write('</html>');
      res.end();

}
