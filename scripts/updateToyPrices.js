// Actualización puntual de precios a guaraníes (PYG) para los productos de juguetería.
// Uso: node scripts/updateToyPrices.js
import "dotenv/config";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";

// 6 con match exacto del Excel del cliente; el resto estimados redondeados realistas
const PRICES = {
  "Naruto Shippuden CLUE Juego de Mesa": 125000,
  "Juego de Ajedrez": 25000,
  "Puzzle de Cocina": 85000,
  "Peluche de Woody": 150000,
  "4x4 a Control Remoto": 195000,
  "Abeja a Pila Musical": 56000,
  "Ajedrez de Madera 5 en 1": 148000,
  "Bloques de Construcción 453 Pcs": 315000,
  "Peluche Animal con Ojos de Brillo": 25000,
  "Peluche Animal Sentado 21 cm": 70000,
  "Acordeón Infantil Grande": 315000,
  "Arco y Flecha 60 Pcs": 55000,
  "Animal Inflable Go Baby": 119000,
  "Animales de la Selva": 50000,
  "Andador para Bebé": 220000,
  "Auto Acrobático Fusca": 210000,
  "Set de Animales de Granja": 60000,
  "Muñeca con Accesorios": 35000,
  "Pelota de Fútbol Infantil": 65000,
  "Juego de Té de Cocina": 45000,
  "Dinosaurio a Pila con Luz": 49000,
  "Pista de Autos Flexible": 125000,
  "Rompecabezas Educativo 100 Pzs": 45000,
  "Camión Bombero con Escalera": 70000,
  "Cocina Infantil con Sonido": 250000,
  "Guitarra Infantil 4 Cuerdas": 50000,
};

const TOY_CATEGORIES = ["Niños", "Niñas", "Bebés"];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  let updated = 0;
  for (const [name, price] of Object.entries(PRICES)) {
    const res = await productModel.updateMany(
      { name, category: { $in: TOY_CATEGORIES } },
      { price }
    );
    if (res.modifiedCount > 0) {
      console.log(`✓ ${name} → ₲${price.toLocaleString("es-PY")}`);
      updated += res.modifiedCount;
    } else {
      console.log(`✗ NO ENCONTRADO: ${name}`);
    }
  }
  console.log(`\n${updated} productos actualizados.`);
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
