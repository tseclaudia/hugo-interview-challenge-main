import express, { Request, Response } from 'express';
import routes from './routes';

const PORT = process.env.API_PORT || 8000;

const app = express();
var bodyParser = require('body-parser');
var cors = require("cors");

app.get('/ping', (req: Request, res: Response) => {
    res.json({ message: 'pong' });
});

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
