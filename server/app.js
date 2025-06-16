import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io';
import { crearUsuario, getUserByID, getUserByEmail, compararContraseña, obtenerAnimales, crearAnimal,obtenerUsuarioDePublicacion,obtenerAnimalPorId} from './database.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, './uploads')));



app.post('/register', async (req, res) => {
    const user = req.body;
    try {
        const newUser = await crearUsuario(user);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
    }
});

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserByID(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Usa la función getUserByEmail para obtener el usuario
        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Usa la función compararContraseña para verificar la contraseña
        const isPasswordValid = await compararContraseña(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Enviar la respuesta con el nombre de usuario y su ID
        res.json({ username: user.name, userId: user.id });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

app.get('/animals', async (req, res) => {
    try {
        const animals = await obtenerAnimales();
        res.json(animals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al obtener los animales' });
    }
});

app.get('/obtenerCelular/:animalId', async (req, res) => {
    const { animalId } = req.params;
    console.log(`Recibiendo solicitud para obtener celular del animal con ID: ${animalId}`);
    try {
        const celular = await obtenerUsuarioDePublicacion(animalId);
  
        if (celular) {
            res.json({ celular });
        } else {
            res.status(404).json({ message: 'Número de teléfono no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener el celular:', error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
});

  
app.post('/postAnimal', upload.array('image', 10), async (req, res) => {
    // Verificar si se subieron archivos
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No se encontraron archivos para cargar.');
    }

    try {
        
        const newAnimal = await crearAnimal(req);
        res.json(newAnimal);
    } catch (error) {
        console.error('Error al crear el animal:', error);
        res.status(500).json({ message: 'Hubo un error al crear el animal' });
    }
});

app.get('/animals/:id', async (req, res) => {
    try {
      const animal = await obtenerAnimalPorId(req.params.id); 
      res.json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener el animal' });
    }
  });
  


server.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
