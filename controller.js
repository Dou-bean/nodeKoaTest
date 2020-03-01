// this module uses router to control different url requests

const fs = require('fs');

function addControllers(router) {
    //load all the js files once synchronically
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        //get our self-defined modules
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

function addMapping(router, mapping) {
    // map async functions with router operations
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

module.exports = function(dir) {
    let 
        controllers_dir = dir || 'controllers', 
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes()
};
