const Koa = require('koa'); //returns a koa class to Koa
const controller = require('./controller'); // use controller.js file
const bodyParser = require('koa-bodyparser'); // handle POST body
const app = new Koa(); // an Koa object represent for the web app itself

//async function
//ctx is the koa variable encapsuled with request and response
// next is the next async function to handle
app.use(async (ctx, next) => { //log request url
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser()); //this code should not be place after router blocks but before app.use(router.routes);

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
