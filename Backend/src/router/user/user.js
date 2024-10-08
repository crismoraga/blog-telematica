import db from '../../models/index.js';

const test = async (ctx) => {
  try {
    const User = db.User;
    const newUser = await User.create({ username: 'piloutz', password: 'sandiaSlayer@usm.cl',email:'sandia7' });
    ctx.body = { mensaje: '¡Usuario base creado!', user: newUser };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al crear el usuario', error: error.message };
  }
};

const getAllUsers = async (ctx) => {
  try {
    const users = await db.User.findAll({ attributes: ['username', 'email'] });
    ctx.body = users;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al obtener los usuarios', error: error.message };
  }
};

const getUserByEmail = async (ctx) => {
  try {
    const { mail } = ctx.params;
    const user = await db.User.findOne({ where: { email: mail }, attributes: ['username', 'email'] });
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 404;
      ctx.body = { mensaje: 'Usuario no encontrado' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al obtener el usuario', error: error.message };
  }
};

const addNewUser = async (ctx) => {
  try {
    const { username, email, password } = ctx.request.body;
    const newUser = await db.User.create({ username, email, password });
    ctx.status = 201;
    ctx.body = { mensaje: 'Usuario creado exitosamente', user: newUser };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al crear el usuario', error: error.message };
  }
};

const deleteUser = async (ctx) => {
  try {
    const { mail } = ctx.params;
    const user = await db.User.findOne({ where: { email: mail } });
    if (user) {
      await user.destroy();
      ctx.body = { mensaje: 'Usuario eliminado exitosamente' };
    } else {
      ctx.status = 404;
      ctx.body = { mensaje: 'Usuario no encontrado' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al eliminar el usuario', error: error.message };
  }
};

const loginUser = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    // Busca al usuario en la base de datos
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      ctx.status = 401; // Unauthorized
      ctx.body = { mensaje: 'Usuario no encontrado' };
      return;
    }

    if (password !== user.password) {
      ctx.status = 401; // Unauthorized
      ctx.body = { mensaje: 'Contraseña incorrecta' };
      return;
    }
    // Si las credenciales son correctas, puedes generar un token o simplemente confirmar el login
    ctx.body = { mensaje: 'Login exitoso', user: { username: user.username, email: user.email } };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { mensaje: 'Error al intentar iniciar sesión', error: error.message };
  }
};




export default {
  test,
  getAllUsers,
  getUserByEmail,
  addNewUser,
  deleteUser,
  loginUser
};
