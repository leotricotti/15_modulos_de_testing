import passport from "passport";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { usersService } from "../repository/index.js";

//Cargar variables de entorno
const JWT_SECRET = config.jwt.SECRET;

// Encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validar contraseña
export const isValidPassword = (savedPassword, password) => {
  return bcrypt.compareSync(password, savedPassword);
};

// Generar JWT token
export const generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Verificar si token es valido para actualizar contraseña
export const verifyToken = (req, res, next) => {
  console.log(req.params.token);
  const token = req.params.token;
  console.log(token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.logger.error(
        `Error de autenticación. El token no pudo ser verificado ${new Date().toLocaleString()}`
      );
    } else {
      req.user = user;
      next();
    }
  });
};

// Verificar JWT token
export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.logger.error(
      `Error de autenticación. No es prosible autenticar el usuario ${new Date().toLocaleString()}`
    );
    res.status(401).send("No es prosible autenticar el usuario");
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        req.logger.error(
          `Error de autenticación. No fue posible verificar el token ${new Date().toLocaleString()}`
        );
        res.status(403).send("No fue posible verificar el token");
      } else {
        req.user = user;
        next();
      }
    });
  }
};

// Esta función para autenticar a los usuarios.
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      req.logger.info(
        `Usuario autenticado con éxito ${new Date().toLocaleString()}`
      );
      req.user = user;
      next();
    })(req, res, next);
  };
};

// Controlar autorizacion de usuario
export const authorization = (...roles) => {
  return async (req, res, next) => {
    const user = await usersService.getOneUser(req.user.user.username);
    const userRole = user[0].role;
    try {
      if (!userRole) {
        req.logger.error(
          `Error de autenticación: Usuario no autorizado. ${new Date().toLocaleString()}`
        );
        return res.status(401).send({ error: "Usuario no autorizado" });
      }
      if (!roles.includes(userRole)) {
        req.logger.error(
          `Error de autenticación. Usuario sin permisos ${new Date().toLocaleString()}`
        );
        return res.status(403).send({ error: "Usuario sin permisos" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Generar productos falsos
export function generateProducts() {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.commerce.product(),
    price: faker.commerce.price(),
    stock: faker.number.int(20),
    category: faker.commerce.department(),
    image: faker.image.url(),
  };
}
