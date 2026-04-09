// ============================================================================
// Configuration for anchr Christian Clothing Brand
// ============================================================================
// Edit this file to customize all content on the site.
// Component files read from this config -- do not hardcode content there.

// Navigation
export interface NavigationConfig {
  logo: string;
  links: Array<{ label: string; href: string }>;
}

export const navigationConfig: NavigationConfig = {
  logo: "anchr",
  links: [
    { label: "Collection", href: "#collection" },
    { label: "Our Story", href: "#story" },
    { label: "Lookbook", href: "#lookbook" },
    { label: "Contact", href: "#contact" },
  ],
};

// Hero
export interface HeroConfig {
  heroImage: string;
  titleText: string;
  subtitleLabel: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  heroImage: "/images/hero_model.jpg",
  titleText: "ANCHOREDINFAITH",
  subtitleLabel: "New Collection Drop",
  ctaText: "Shop Now",
};

// Manifesto
export interface ManifestoConfig {
  image: string;
  phrases: string[];
}

export const manifestoConfig: ManifestoConfig = {
  image: "/images/manifesto_model.jpg",
  phrases: [
    "Hope",
    "Anchor",
    "For",
    "The",
    "Soul",
    "Faith",
    "Over",
    "Fear",
    "Always",
  ],
};

// Product Spotlight
export interface ProductSpotlightConfig {
  productImage: string;
  portraitImage: string;
  titlePhrases: string[];
  ctaText: string;
  price: string;
}

export const productSpotlightConfig: ProductSpotlightConfig = {
  productImage: "/images/product_hoodie.jpg",
  portraitImage: "/images/spotlight_model.jpg",
  titlePhrases: [
    "Wear",
    "Your",
    "Faith",
    "Make",
    "A",
    "Statement",
  ],
  ctaText: "Shop Hoodies",
  price: "$68",
};

// Texture
export interface TextureConfig {
  portraitImage: string;
  macroImage: string;
  titlePhrases: string[];
  subtitle: string;
}

export const textureConfig: TextureConfig = {
  portraitImage: "/images/texture_model_side.jpg",
  macroImage: "/images/texture_fabric.jpg",
  titlePhrases: [
    "Premium",
    "Quality",
    "Built",
    "To",
    "Last",
    "Forever",
  ],
  subtitle: "Crafted with purpose. Designed for believers.",
};

// Shade Range
export interface ShadeConfig {
  name: string;
  image: string;
}

export interface ShadeRangeConfig {
  heading: string[];
  headingAccent: string;
  shades: ShadeConfig[];
  price: string;
  ctaText: string;
}

export const shadeRangeConfig: ShadeRangeConfig = {
  heading: ["FIND", "YOUR"],
  headingAccent: "STYLE",
  shades: [
    { name: "Anchor Black", image: "/images/shade_swatch_1.jpg" },
    { name: "Faith White", image: "/images/shade_swatch_2.jpg" },
    { name: "Hope Grey", image: "/images/shade_swatch_3.jpg" },
    { name: "Grace Navy", image: "/images/shade_swatch_4.jpg" },
    { name: "Mercy Sand", image: "/images/shade_swatch_5.jpg" },
    { name: "Truth Olive", image: "/images/shade_swatch_6.jpg" },
  ],
  price: "$48",
  ctaText: "Add to Cart",
};

// Final Statement
export interface FinalStatementConfig {
  image1: string;
  image2: string;
  phrases: string[];
  subtitle: string;
}

export const finalStatementConfig: FinalStatementConfig = {
  image1: "/images/closing_model_1.jpg",
  image2: "/images/closing_model_2.jpg",
  phrases: [
    "Be",
    "The",
    "Light",
    "In",
    "A",
    "Dark",
    "World",
  ],
  subtitle: "Join the movement. Wear your faith boldly.",
};

// Contact
export interface ContactConfig {
  leftLinks: string[];
  formHeading: string[];
  formHeadingAccent: string;
  formDescription: string;
  emailPlaceholder: string;
  subscribeButtonText: string;
  socialLinks: Array<{ label: string; href: string }>;
  copyright: string;
  tagline: string;
}

export const contactConfig: ContactConfig = {
  leftLinks: [
    "Shop All",
    "Hoodies",
    "T-Shirts",
    "Accessories",
    "Lookbook",
    "About Us",
  ],
  formHeading: ["STAY", "ANCHORED"],
  formHeadingAccent: "CONNECTED",
  formDescription: "Subscribe for new drops, exclusive offers, and faith-filled content.",
  emailPlaceholder: "Enter your email",
  subscribeButtonText: "Subscribe",
  socialLinks: [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  copyright: "2026 anchr. All rights reserved.",
  tagline: "Hope as an anchor for the soul. Hebrews 6:19",
};

// Site Metadata
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "anchr | Christian Clothing Brand",
  description: "Wear your faith boldly. Premium Christian streetwear designed for believers who want to make a statement.",
  language: "en",
};
