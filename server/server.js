import http from 'node:http';
import { execFile } from 'node:child_process';
import { open, writeFile } from 'node:fs/promises';

const server = http.createServer();

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method == 'POST') {

    const fileHandle = await open('./test.c', 'w');
    const writeStream = fileHandle.createWriteStream();

    req.pipe(writeStream);


    writeStream.on('finish', () => {
      execFile('gcc', ['test.c'], (err, stdout, stderr) => {
        if (err) {
          console.log(stderr);
          res.end(JSON.stringify(stderr));
        } else {
          execFile('./a.out', (err, stdout) => {
            res.end(stdout);
            fileHandle.close();
          })
        }
      })
    })
  }
})

server.listen(3000, () => {
  console.log("Server is running on port ", 3000)
})






