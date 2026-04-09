'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { ProductSpotlightConfig } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

interface ProductSpotlightProps {
  config: ProductSpotlightConfig;
}

export default function ProductSpotlight({ config }: ProductSpotlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const productTiles = section.querySelectorAll('.product-tile');
      const portraitTiles = section.querySelectorAll('.portrait-tile');
      const textTiles = section.querySelectorAll('.text-tile');
      const accentTiles = section.querySelectorAll('.accent-tile');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        productTiles,
        { x: '-30vw', rotate: -6, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        portraitTiles,
        { y: '35vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.06
      );

      scrollTl.fromTo(
        textTiles,
        { x: '12vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        accentTiles,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(1.4)' },
        0.15
      );

      scrollTl.fromTo(
        [productTiles, portraitTiles],
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textTiles,
        { x: 0, opacity: 1 },
        { x: '14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!config.productImage || !config.portraitImage) return null;

  return (
    <section ref={sectionRef} id="shop" className="section-pinned z-30" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="grid-checkerboard">
        {/* Row 1 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />

        {/* Row 2 */}
        <div className="grid-tile" />
        <div className="grid-tile product-tile relative overflow-hidden">
          <Image src={config.productImage} alt="" fill className="image-slice" style={{ objectPosition: '30% 30%' }} />
        </div>
        <div className="grid-tile product-tile relative overflow-hidden">
          <Image src={config.productImage} alt="" fill className="image-slice" style={{ objectPosition: '60% 30%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '20% 20%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '50% 20%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.titlePhrases[0] && (
          <div className="grid-tile text-tile"><span className="tile-text">{config.titlePhrases[0]}</span></div>
        )}
        <div className="grid-tile" />

        {/* Row 3 */}
        <div className="grid-tile" />
        <div className="grid-tile product-tile relative overflow-hidden">
          <Image src={config.productImage} alt="" fill className="image-slice" style={{ objectPosition: '30% 60%' }} />
        </div>
        <div className="grid-tile product-tile relative overflow-hidden">
          <Image src={config.productImage} alt="" fill className="image-slice" style={{ objectPosition: '60% 60%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '20% 50%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '50% 50%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '80% 50%' }} />
        </div>
        {config.titlePhrases.slice(1, 3).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 4 */}
        <div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '30% 80%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '60% 80%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.titlePhrases.slice(3, 6).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 5 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile accent-tile grid-tile-accent" />
        <div className="grid-tile" /><div className="grid-tile" />

        {/* Row 6 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />
        {config.ctaText && (
          <div className="grid-tile flex items-center justify-center">
            <button className="cta-button">{config.ctaText}</button>
          </div>
        )}
        {config.price && (
          <div className="grid-tile flex items-center justify-center">
            <span className="font-mono-label" style={{ color: 'var(--color-fg)' }}>{config.price}</span>
          </div>
        )}
        <div className="grid-tile" />
      </div>
    </section>
  );
}
