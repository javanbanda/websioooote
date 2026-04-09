// Run with: npm run db:seed
// Deletes and recreates product.db from config data.

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'product.db');

const db = new Database(dbPath);

db.exec(`
  DROP TABLE IF EXISTS products;

  CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price_cents INTEGER NOT NULL,
    category TEXT NOT NULL,
    image_path TEXT NOT NULL,
    description TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

const insert = db.prepare(`
  INSERT INTO products (slug, name, price_cents, category, image_path, description)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const products = [
  {
    slug: 'anchored-hoodie',
    name: 'Anchored Hoodie',
    price_cents: 6800,
    category: 'hoodies',
    image_path: '/images/product_hoodie.jpg',
    description: 'Wear your faith boldly. Premium heavyweight hoodie.',
  },
  {
    slug: 'anchor-black-tee',
    name: 'Anchor Black',
    price_cents: 4800,
    category: 'tees',
    image_path: '/images/shade_swatch_1.jpg',
    description: null,
  },
  {
    slug: 'faith-white-tee',
    name: 'Faith White',
    price_cents: 4800,
    category: 'tees',
    image_path: '/images/shade_swatch_2.jpg',
    description: null,
  },
  {
    slug: 'hope-grey-tee',
    name: 'Hope Grey',
    price_cents: 4800,
    category: 'tees',
    image_path: '/images/shade_swatch_3.jpg',
    description: null,
  },
  {
    slug: 'grace-navy-tee',
    name: 'Grace Navy',
    price_cents: 4800,
    category: 'tees',
    image_path: '/images/shade_swatch_4.jpg',
    description: null,
  },
  {
    slug: 'mercy-sand-tee',
    name: 'Mercy Sand',
    price_cents: 4800,
    category: 'tees',
    image_path: '/images/shade_swatch_5.jpg',
    description: null,
  },
  {
    slug: 'truth-olive-tee',
    name: 'Truth Olive',
    price_cents: 4800,
    category: 'tees',
    image_path: '/images/shade_swatch_6.jpg',
    description: null,
  },
];

const insertMany = db.transaction((rows: typeof products) => {
  for (const row of rows) {
    insert.run(row.slug, row.name, row.price_cents, row.category, row.image_path, row.description);
  }
});

insertMany(products);

console.log(`Seeded ${products.length} products into ${dbPath}`);
db.close();
