const server = require('./src/server.js');

server.listen(server.get('port'), ()=>{
    console.log(`\n\t-> historias-api furulando...`);
});
