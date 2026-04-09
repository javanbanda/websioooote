import 'server-only';
import { getDb } from './db';

export interface Product {
  id: number;
  slug: string;
  name: string;
  price_cents: number;
  category: string;
  image_path: string;
  description: string | null;
  created_at: string;
}

export function getAllProducts(): Product[] {
  const db = getDb();
  return db.prepare('SELECT * FROM products ORDER BY id ASC').all() as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  const db = getDb();
  return db.prepare('SELECT * FROM products WHERE slug = ?').get(slug) as Product | undefined;
}
