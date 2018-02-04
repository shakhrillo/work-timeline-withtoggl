'use strict';

const Hapi = require('hapi');
// const request = require('request');
const Wreck = require('wreck');

const method = 'GET'; // GET, POST, PUT, DELETE
const uri = '/';
const readableStream = Wreck.toReadableStream('foo=bar');

const wreck = Wreck.defaults({
    // headers: { 'x-foo-bar': 123 }
    headers: { 
        'Content-Type':  'application/json'
     },
    // agents: {
    //     https: new Https.Agent({ maxSockets: 100 }),
    //     http: new Http.Agent({ maxSockets: 1000 }),
    //     httpsAllowUnauthorized: new Https.Agent({ maxSockets: 100, rejectUnauthorized: false })
    // }
});

const url = 'https://mobiledev.myjetbrains.com/youtrack/rest/admin/agile';
const example = async function () {
    const promise = wreck.request('GET', url, {
        headers: {
            'Content-Type':  'application/json'
        }
    });
    // const { res, payload } = await Wreck.get(url);
    // console.log(payload.toString());
    const res = await promise;
    const body = await Wreck.read(res, {json:true});
    console.log(body);
    return body
};


const server = new Hapi.Server({
    port: 3000, host: 'localhost'
});

const rq = async function () {
    const { res, payload } = await Wreck.get(url,{
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
            // accept: 'application/json'
            // 'Content-Type': 'application/json'
        }
    });
    // console.log(res);
    // console.log(payload);
    // response 
    return res
};
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        console.log(url)
        return rq();
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
