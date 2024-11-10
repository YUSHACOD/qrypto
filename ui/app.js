import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './routes/index.js';

const dir_name = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(dir_name, 'public'))); // Serving from 'public'
app.use(express.json());

// Use routes from the routes module
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://wsl.localhost:${PORT}`);
});
