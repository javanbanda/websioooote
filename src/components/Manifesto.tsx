'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { ManifestoConfig } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

interface ManifestoProps {
  config: ManifestoConfig;
}

export default function Manifesto({ config }: ManifestoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const textTiles = section.querySelectorAll('.text-tile');
      const imageTiles = section.querySelectorAll('.image-tile');
      const accentTiles = section.querySelectorAll('.accent-tile');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        textTiles,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        imageTiles,
        { x: '-18vw', clipPath: 'inset(0 100% 0 0)' },
        { x: 0, clipPath: 'inset(0 0% 0 0)', stagger: 0.03, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        accentTiles,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(1.4)' },
        0.12
      );

      scrollTl.fromTo(
        textTiles,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageTiles,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        accentTiles,
        { scale: 1, opacity: 1 },
        { scale: 1.2, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!config.image || config.phrases.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-pinned z-20" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="grid-checkerboard">
        {/* Row 1 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />

        {/* Row 2 */}
        <div className="grid-tile" />
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image} alt="" fill className="image-slice" style={{ objectPosition: '10% 20%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image} alt="" fill className="image-slice" style={{ objectPosition: '30% 20%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.phrases.slice(0, 4).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 3 */}
        <div className="grid-tile" />
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image} alt="" fill className="image-slice" style={{ objectPosition: '10% 50%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image} alt="" fill className="image-slice" style={{ objectPosition: '30% 50%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image} alt="" fill className="image-slice" style={{ objectPosition: '50% 50%' }} />
        </div>
        {config.phrases.slice(4, 6).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}
        <div className="grid-tile" />
        <div className="grid-tile" />

        {/* Row 4 */}
        <div className="grid-tile" />
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image} alt="" fill className="image-slice" style={{ objectPosition: '20% 80%' }} />
        </div>
        <div className="grid-tile" />
        <div className="grid-tile accent-tile grid-tile-accent" />
        <div className="grid-tile" />
        {config.phrases.slice(6, 9).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 5 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" />
        <div className="grid-tile accent-tile grid-tile-accent" />
        <div className="grid-tile" />
        <div className="grid-tile flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--color-fg)' }}>
            <path d="M8 4L16 12L8 20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid-tile" />

        {/* Row 6 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />
      </div>
    </section>
  );
}
