// Asigna valores de stock a los productos de juguetería sembrados.
// Uso: node scripts/updateToyStock.js
import "dotenv/config";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";

// Stock inicial por producto (valores realistas para la demo)
const STOCK = {
  "Naruto Shippuden CLUE Juego de Mesa": 8,
  "Juego de Ajedrez": 15,
  "Puzzle de Cocina": 12,
  "Peluche de Woody": 6,
  "4x4 a Control Remoto": 10,
  "Abeja a Pila Musical": 20,
  "Ajedrez de Madera 5 en 1": 9,
  "Bloques de Construcción 453 Pcs": 5,
  "Peluche Animal con Ojos de Brillo": 25,
  "Peluche Animal Sentado 21 cm": 18,
  "Acordeón Infantil Grande": 4,
  "Arco y Flecha 60 Pcs": 14,
  "Animal Inflable Go Baby": 11,
  "Animales de la Selva": 30,
  "Andador para Bebé": 7,
  "Auto Acrobático Fusca": 16,
  "Set de Animales de Granja": 22,
  "Muñeca con Accesorios": 13,
  "Pelota de Fútbol Infantil": 40,
  "Juego de Té de Cocina": 17,
  "Dinosaurio a Pila con Luz": 12,
  "Pista de Autos Flexible": 0,
  "Rompecabezas Educativo 100 Pzs": 26,
  "Camión Bombero con Escalera": 9,
  "Cocina Infantil con Sonido": 3,
  "Guitarra Infantil 4 Cuerdas": 8,
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  let updated = 0;
  for (const [name, stock] of Object.entries(STOCK)) {
    const res = await productModel.updateMany(
      { name, category: { $in: ["Niños", "Niñas", "Bebés"] } },
      { stock }
    );
    if (res.modifiedCount > 0) {
      console.log(`✓ ${name} → stock ${stock}`);
      updated += res.modifiedCount;
    } else {
      console.log(`✗ NO ENCONTRADO: ${name}`);
    }
  }
  console.log(`\n${updated} productos con stock asignado.`);
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
