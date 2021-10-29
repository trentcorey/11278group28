const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Listening on port ' + port));

app.get('/express_backend', (req, res) => {
    res.send({express: 'Your express backend is connected to React'});
});

app.post('/send_data', function(request, response) {
    console.log(request.body);
    res.send(request.body);
});