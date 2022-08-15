const http = require('http');
const qs = require('qs');
const fs = require('fs');


const server = http.createServer((req, res)=>{
    if(req.method === 'GET'){
        fs.readFile('./view/index.html','utf-8',(err,data)=>{
            if(err){
                throw new Error(err.message);
            }
            res.writeHead(200,{'Content-type':'text/html'});
            res.write(data);
            res.end();
        })
    }
    else {
        let data = '';
        req.on('data',(chunk)=>{
            data+=chunk;
        })
        req.on('end',()=>{
            let name = qs.parse(data).name;
            fs.writeFile('./data.txt',name,(err)=>{
                if(err){
                    console.log(err.message);
                    return ;
                }
                return res.end('Create Success');
            })
        })
        req.on('error',()=>{
            console.log('error');
        })
    }
})

server.listen(8080,()=>{
    console.log(`Server is running at http://localhost:8080`)
})