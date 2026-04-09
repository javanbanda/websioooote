'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { FinalStatementConfig } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

interface FinalStatementProps {
  config: FinalStatementConfig;
}

export default function FinalStatement({ config }: FinalStatementProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const imageTiles = section.querySelectorAll('.image-tile');
      const textTiles = section.querySelectorAll('.text-tile');
      const accentTiles = section.querySelectorAll('.accent-tile');

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        imageTiles,
        { x: (i: number) => (i < 4 ? '-18vw' : '18vw'), opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        textTiles,
        { y: '12vh', opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'power2.out' },
        0.08
      );

      scrollTl.fromTo(
        accentTiles,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.05, ease: 'back.out(1.4)' },
        0.15
      );

      scrollTl.fromTo(
        [...imageTiles, ...textTiles],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!config.image1 || !config.image2) return null;

  return (
    <section ref={sectionRef} id="story" className="section-pinned z-[60]" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="grid-checkerboard">
        {/* Row 1 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />

        {/* Row 2 */}
        <div className="grid-tile" />
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image1} alt="" fill className="image-slice" style={{ objectPosition: '20% 30%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image1} alt="" fill className="image-slice" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image2} alt="" fill className="image-slice" style={{ objectPosition: '30% 30%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image2} alt="" fill className="image-slice" style={{ objectPosition: '60% 30%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.phrases.slice(0, 2).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 3 */}
        <div className="grid-tile" />
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image1} alt="" fill className="image-slice" style={{ objectPosition: '20% 60%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image1} alt="" fill className="image-slice" style={{ objectPosition: '50% 60%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image2} alt="" fill className="image-slice" style={{ objectPosition: '30% 60%' }} />
        </div>
        <div className="grid-tile image-tile relative overflow-hidden">
          <Image src={config.image2} alt="" fill className="image-slice" style={{ objectPosition: '60% 60%' }} />
        </div>
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.phrases.slice(2, 4).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 4 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" />
        <div className="grid-tile accent-tile grid-tile-accent" />
        {config.phrases.slice(4, 7).map((phrase, i) => (
          <div key={i} className="grid-tile text-tile"><span className="tile-text">{phrase}</span></div>
        ))}

        {/* Row 5 */}
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" /><div className="grid-tile" />
        <div className="grid-tile" /><div className="grid-tile" />

        {/* Row 6 */}
        <div className="grid-tile col-span-8 flex items-center justify-center">
          {config.subtitle && <span className="font-mono-label" style={{ color: 'var(--color-fg-muted)' }}>{config.subtitle}</span>}
        </div>
      </div>
    </section>
  );
}
