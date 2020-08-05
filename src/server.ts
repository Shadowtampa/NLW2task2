import express from 'express';

const app = express();



app.get('/users', (request, response) => {
    const users = [
        {name: "Luis", idade: 21},
        {name: "Diego", idade: 333},
    ];
    
    return response.json(users);
});

app.listen(3333);

