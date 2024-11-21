import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express()
app.set('view engine','ejs')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.get('/',(req,res) =>
{
    console.log('Here')
    // res.download('server.js')
    // res.json("HI")
    res.render('index')
})

app.listen(3000)