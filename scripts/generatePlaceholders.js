// Reemplaza las imágenes-emoji de los productos sembrados por placeholders
// profesionales: fondo neutro + nombre del producto en tipografía seria.
// Uso: node scripts/generatePlaceholders.js
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// Los 22 productos sembrados con imagen emoji (los 4 con foto real quedan intactos)
const NAMES = [
  "4x4 a Control Remoto",
  "Abeja a Pila Musical",
  "Ajedrez de Madera 5 en 1",
  "Bloques de Construcción 453 Pcs",
  "Peluche Animal con Ojos de Brillo",
  "Peluche Animal Sentado 21 cm",
  "Acordeón Infantil Grande",
  "Arco y Flecha 60 Pcs",
  "Animal Inflable Go Baby",
  "Animales de la Selva",
  "Andador para Bebé",
  "Auto Acrobático Fusca",
  "Set de Animales de Granja",
  "Muñeca con Accesorios",
  "Pelota de Fútbol Infantil",
  "Juego de Té de Cocina",
  "Dinosaurio a Pila con Luz",
  "Pista de Autos Flexible",
  "Rompecabezas Educativo 100 Pzs",
  "Camión Bombero con Escalera",
  "Cocina Infantil con Sonido",
  "Guitarra Infantil 4 Cuerdas",
];

// corta el nombre en líneas de hasta maxChars sin partir palabras
const wrapLines = (text, maxChars = 18) => {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > maxChars && current) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
};

const buildSvg = (name) => {
  const lines = wrapLines(name);
  const fontSize = lines.length > 2 ? 52 : 58;
  const lineHeight = fontSize * 1.25;
  const startY = 400 - ((lines.length - 1) * lineHeight) / 2;

  const textLines = lines
    .map(
      (line, i) =>
        `<text x="400" y="${startY + i * lineHeight}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" fill="#3f3f46">${line
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")}</text>`
    )
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <rect width="800" height="800" fill="#f7f6f3"/>
  <rect x="28" y="28" width="744" height="744" fill="none" stroke="#d6d3cd" stroke-width="2"/>
  ${textLines}
  <line x1="330" y1="640" x2="470" y2="640" stroke="#b8b4ac" stroke-width="1.5"/>
  <text x="400" y="690" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="6" fill="#8a8680">JUGUETERÍA CABRAL</text>
</svg>`;
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  let updated = 0;
  for (const name of NAMES) {
    const svg = buildSvg(name);
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "image",
      folder: "placeholders",
    });
    const res = await productModel.updateMany(
      { name, category: { $in: ["Niños", "Niñas", "Bebés"] } },
      { image: [result.secure_url] }
    );
    if (res.modifiedCount > 0) {
      console.log(`✓ ${name}`);
      updated += res.modifiedCount;
    } else {
      console.log(`✗ NO ENCONTRADO: ${name}`);
    }
  }
  console.log(`\n${updated} productos con placeholder profesional.`);
  await mongoose.disconnect();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
