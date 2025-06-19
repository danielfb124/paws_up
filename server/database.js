import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: {
        rejectUnauthorized: true
    }
}).promise();


export async function crearUsuario(datosUsuario) {

    const { nombre, email, contraseña ,celular} = datosUsuario; 

    const contraseñaEncriptada = await encriptarContraseña(contraseña);

    const [resultado] = await pool.query(
        'INSERT INTO users (name, email, password, celular) VALUES (?, ?, ?,?)',
        [nombre, email, contraseñaEncriptada,celular]
    );

    return { id: resultado.insertId }; 
}

async function encriptarContraseña(contraseña) {
    const rondasSalt = 10;
    const contraseñaEncriptada = await bcrypt.hash(contraseña, rondasSalt);
    return contraseñaEncriptada;
}

/* Ejemplo de uso crearUsuario
const datosUsuario = {
    nombre: 'Sara espinal ',
    email: 'Sara.espinal@correo.com',
    contraseña: '2024',
};

crearUsuario(datosUsuario);
*/
export async function crearAnimal(req) {
    const { animal_type, breed, sexing, state_description, exact_location,user_id } = req.body;
    const image_data = req.files.map(file => file.path); 
    const [resultado] = await pool.query(
        'INSERT INTO animals (animal_type, breed, sexing, state_description, exact_location, image_data,user_id) VALUES (?, ?, ?, ?, ?, ?,?)',
        [animal_type, breed, sexing, state_description, exact_location, JSON.stringify(image_data),user_id]
    );
    return { id: resultado.insertId };
}
export async function obtenerAnimales() {
    const [resultado] = await pool.query(
        'SELECT * FROM animals'
    );
    return resultado.map(animal => ({
        ...animal,
        image_data: JSON.parse(animal.image_data),
    }));
}
export async function getUserByID(id) {
    const [row] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return row[0];
    //console.log(row[0])
}
//getUserByID(1)
export async function getUserByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length) {
        return rows[0];
    } else {
        return null;
    }
}
export async function compararContraseña(password, passwordEncriptada) {
    const coinciden = await bcrypt.compare(password, passwordEncriptada);
    return coinciden;
}

export async function obtenerUsuarioDePublicacion(animalId) {
    const [rows] = await pool.query(
      'SELECT u.celular FROM animals a JOIN users u ON a.user_id = u.id WHERE a.user_id = ?',
        [animalId]
    );
    //console.log('Resultado de la consulta SQL:', rows);
    if (rows.length > 0) {
        console.log('Celular encontrado:', rows[0].celular);    
        return rows[0].celular;
    } else {
        console.log('No se encontró ningún resultado para el animalId:', animalId);
        return null;
    }
}

export async function obtenerAnimalPorId(animalId) {
    const [rows] = await pool.query(
        'SELECT * FROM animals WHERE id = ?',
        [animalId]
    );

    if (rows.length > 0) {
        const animal = rows[0];
        return {
            ...animal,
            image_data: JSON.parse(animal.image_data), // Procesar el campo image_data como un array
        };
    } else {
        return null; // En caso de que no haya resultados
    }
}



