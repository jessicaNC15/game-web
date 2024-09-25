const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('start');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
