import type { Metadata } from 'next';
import {
  siteConfig,
  navigationConfig,
  heroConfig,
  manifestoConfig,
  productSpotlightConfig,
  textureConfig,
  shadeRangeConfig,
  finalStatementConfig,
  contactConfig,
} from '@/lib/config';
import { getAllProducts } from '@/lib/products';
import type { Product } from '@/lib/products';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import ProductSpotlight from '@/components/ProductSpotlight';
import Texture from '@/components/Texture';
import ShadeRange from '@/components/ShadeRange';
import FinalStatement from '@/components/FinalStatement';
import Contact from '@/components/Contact';
import GrainOverlay from '@/components/GrainOverlay';

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function Home() {
  let products: Product[] = [];
  try {
    products = getAllProducts();
  } catch {
    // product.db not seeded yet -- ShadeRange falls back to config data
  }

  return (
    <>
      <GrainOverlay />
      <Navigation config={navigationConfig} />
      <main className="relative">
        <Hero config={heroConfig} />
        <Manifesto config={manifestoConfig} />
        <ProductSpotlight config={productSpotlightConfig} />
        <Texture config={textureConfig} />
        <ShadeRange config={shadeRangeConfig} products={products} />
        <FinalStatement config={finalStatementConfig} />
        <Contact config={contactConfig} />
      </main>
    </>
  );
}
