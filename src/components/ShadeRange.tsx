'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { ShadeRangeConfig } from '@/lib/config';
import type { Product } from '@/lib/products';

gsap.registerPlugin(ScrollTrigger);

interface ShadeRangeProps {
  config: ShadeRangeConfig;
  products: Product[];
}

export default function ShadeRange({ config, products }: ShadeRangeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector('.section-heading');
      const cards = section.querySelectorAll('.shade-card');

      gsap.fromTo(
        heading,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: '10vh', rotate: -1.5, opacity: 0 },
          {
            y: 0,
            rotate: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Use DB products when available, fall back to config shades
  const shades = products.length > 0
    ? products
        .filter((p) => p.category === 'tees')
        .map((p) => ({
          name: p.name,
          image: p.image_path,
          price: `$${Math.floor(p.price_cents / 100)}`,
        }))
    : config.shades.map((s) => ({ name: s.name, image: s.image, price: config.price }));

  if (shades.length === 0 || config.heading.length === 0) return null;

  return (
    <section ref={sectionRef} id="shades" className="relative z-50 py-20 min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="section-heading mb-16">
          {config.heading.map((line, i) => (
            <h2 key={i} className="font-heading text-5xl md:text-7xl mb-4" style={{ color: 'var(--color-fg)' }}>{line}</h2>
          ))}
          {config.headingAccent && (
            <h2 className="font-heading text-5xl md:text-7xl" style={{ color: 'var(--color-accent)' }}>{config.headingAccent}</h2>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shades.map((shade) => (
            <div
              key={shade.name}
              className="shade-card group relative overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={shade.image}
                  alt={shade.name}
                  fill
                  className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="shade-card-overlay absolute inset-0" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl" style={{ color: 'var(--color-fg)' }}>{shade.name}</h3>
                  <span className="font-mono-label" style={{ color: 'var(--color-fg-muted)' }}>{shade.price}</span>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                  <span className="text-xs" style={{ color: 'var(--color-accent-fg)' }}>+</span>
                </div>
              </div>
              {config.ctaText && <button className="w-full cta-button">{config.ctaText}</button>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
