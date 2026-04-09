'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { TextureConfig } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

interface TextureProps {
  config: TextureConfig;
}

export default function Texture({ config }: TextureProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const macroTiles = section.querySelectorAll('.macro-tile');
      const portraitTiles = section.querySelectorAll('.portrait-tile');
      const textTiles = section.querySelectorAll('.text-tile');
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
        macroTiles,
        { scale: 1.25, x: '10vw', opacity: 0 },
        { scale: 1, x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        portraitTiles,
        { x: '-22vw', opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.05
      );

      scrollTl.fromTo(
        textTiles,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        accentTiles,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(1.4)' },
        0.15
      );

      scrollTl.fromTo(
        macroTiles,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        textTiles,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        accentTiles,
        { scale: 1, opacity: 1 },
        { scale: 1.15, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!config.portraitImage || !config.macroImage) return null;

  return (
    <section ref={sectionRef} className="section-pinned z-40" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="grid-checkerboard">
        {/* Row 1 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />

        {/* Row 2 */}
        <div className="grid-tile" />
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '20% 30%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '30% 30%' }} />
        </div>
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '60% 30%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.titlePhrases.slice(0, 2).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 3 */}
        <div className="grid-tile" />
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '20% 60%' }} />
        </div>
        <div className="grid-tile portrait-tile relative overflow-hidden">
          <Image src={config.portraitImage} alt="" fill className="image-slice" style={{ objectPosition: '50% 60%' }} />
        </div>
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '30% 60%' }} />
        </div>
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '60% 60%' }} />
        </div>
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '80% 60%' }} />
        </div>
        {config.titlePhrases.slice(2, 4).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 4 */}
        <div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '40% 80%' }} />
        </div>
        <div className="grid-tile macro-tile relative overflow-hidden">
          <Image src={config.macroImage} alt="" fill className="image-slice" style={{ objectPosition: '70% 80%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.titlePhrases.slice(4, 6).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}
        <div className="grid-tile accent-tile grid-tile-accent" />

        {/* Row 5 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: 'var(--color-fg)' }}>
            <path d="M10 0V20M0 10H20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="grid-tile" />

        {/* Row 6 */}
        <div className="grid-tile col-span-8 flex items-center justify-center">
          {config.subtitle && <span className="font-mono-label" style={{ color: 'var(--color-fg-muted)' }}>{config.subtitle}</span>}
        </div>
      </div>
    </section>
  );
}
