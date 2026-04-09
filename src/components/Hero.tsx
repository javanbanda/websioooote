'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import type { HeroConfig } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  config: HeroConfig;
}

export default function Hero({ config }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<HTMLDivElement[]>([]);
  const imageSlicesRef = useRef<HTMLImageElement[]>([]);
  const textTilesRef = useRef<HTMLDivElement[]>([]);
  const accentTilesRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.3 });

      loadTl.fromTo(
        tilesRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
          stagger: { amount: 0.6, from: 'start' },
        }
      );

      loadTl.fromTo(
        imageSlicesRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.06,
        },
        '-=0.5'
      );

      loadTl.fromTo(
        textTilesRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.6)',
          stagger: 0.05,
        },
        '-=0.4'
      );

      loadTl.fromTo(
        accentTilesRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.6)',
          stagger: 0.08,
        },
        '-=0.3'
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set(tilesRef.current, { opacity: 1, x: 0, y: 0, scale: 1 });
            gsap.set(imageSlicesRef.current, { opacity: 1, x: 0, y: 0 });
            gsap.set(textTilesRef.current, { opacity: 1, x: 0, y: 0 });
            gsap.set(accentTilesRef.current, { opacity: 1, scale: 1 });
          },
        },
      });

      scrollTl.fromTo(
        tilesRef.current,
        { x: 0, y: 0, opacity: 1 },
        {
          x: '-18vw',
          y: '-18vh',
          opacity: 0,
          ease: 'power2.in',
          stagger: { amount: 0.2, from: 'random' },
        },
        0.7
      );

      scrollTl.fromTo(
        accentTilesRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.15, opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (!config.heroImage || !config.titleText) return null;

  const addToTilesRef = (el: HTMLDivElement | null, index: number) => {
    if (el) tilesRef.current[index] = el;
  };

  const addToImageSlicesRef = (el: HTMLImageElement | null, index: number) => {
    if (el) imageSlicesRef.current[index] = el;
  };

  const addToTextTilesRef = (el: HTMLDivElement | null, index: number) => {
    if (el) textTilesRef.current[index] = el;
  };

  const addToAccentTilesRef = (el: HTMLDivElement | null, index: number) => {
    if (el) accentTilesRef.current[index] = el;
  };

  const titleLetters = config.titleText.split('');

  return (
    <section ref={sectionRef} className="section-pinned z-10" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="grid-checkerboard">
        {/* Row 1 */}
        <div ref={(el) => addToTilesRef(el, 0)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 1)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 2)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 3)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 4)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 5)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 6)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 7)} className="grid-tile" />

        {/* Row 2 - Image slices + text start */}
        <div ref={(el) => addToTilesRef(el, 8)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 9)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 10)} className="grid-tile relative">
          <Image
            ref={(el) => addToImageSlicesRef(el as unknown as HTMLImageElement, 0)}
            src={config.heroImage}
            alt=""
            fill
            className="image-slice"
            style={{ objectPosition: '20% 20%' }}
          />
        </div>
        <div ref={(el) => addToTilesRef(el, 11)} className="grid-tile relative">
          <Image
            ref={(el) => addToImageSlicesRef(el as unknown as HTMLImageElement, 1)}
            src={config.heroImage}
            alt=""
            fill
            className="image-slice"
            style={{ objectPosition: '40% 20%' }}
          />
        </div>
        <div ref={(el) => addToTilesRef(el, 12)} className="grid-tile relative">
          {titleLetters[0] && <div ref={(el) => addToTextTilesRef(el, 0)} className="tile-text">{titleLetters[0]}</div>}
        </div>
        <div
          ref={(el) => {
            addToTilesRef(el, 13);
            addToAccentTilesRef(el, 0);
          }}
          className="grid-tile grid-tile-accent"
        />
        <div ref={(el) => addToTilesRef(el, 14)} className="grid-tile">
          {config.subtitleLabel && <span className="font-mono-label" style={{ color: 'var(--color-fg)' }}>{config.subtitleLabel}</span>}
        </div>
        <div ref={(el) => addToTilesRef(el, 15)} className="grid-tile" />

        {/* Row 3 */}
        <div ref={(el) => addToTilesRef(el, 16)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 17)} className="grid-tile relative">
          {titleLetters[1] && <div ref={(el) => addToTextTilesRef(el, 1)} className="tile-text">{titleLetters[1]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 18)} className="grid-tile relative">
          {titleLetters[2] && <div ref={(el) => addToTextTilesRef(el, 2)} className="tile-text">{titleLetters[2]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 19)} className="grid-tile relative">
          <Image
            ref={(el) => addToImageSlicesRef(el as unknown as HTMLImageElement, 2)}
            src={config.heroImage}
            alt=""
            fill
            className="image-slice"
            style={{ objectPosition: '60% 40%' }}
          />
        </div>
        <div ref={(el) => addToTilesRef(el, 20)} className="grid-tile relative">
          <Image
            ref={(el) => addToImageSlicesRef(el as unknown as HTMLImageElement, 3)}
            src={config.heroImage}
            alt=""
            fill
            className="image-slice"
            style={{ objectPosition: '80% 40%' }}
          />
        </div>
        <div ref={(el) => addToTilesRef(el, 21)} className="grid-tile relative">
          {titleLetters[3] && <div ref={(el) => addToTextTilesRef(el, 3)} className="tile-text">{titleLetters[3]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 22)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 23)} className="grid-tile" />

        {/* Row 4 */}
        <div ref={(el) => addToTilesRef(el, 24)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 25)} className="grid-tile relative">
          {titleLetters[4] && <div ref={(el) => addToTextTilesRef(el, 4)} className="tile-text">{titleLetters[4]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 26)} className="grid-tile relative">
          {titleLetters[5] && <div ref={(el) => addToTextTilesRef(el, 5)} className="tile-text">{titleLetters[5]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 27)} className="grid-tile relative">
          <Image
            ref={(el) => addToImageSlicesRef(el as unknown as HTMLImageElement, 4)}
            src={config.heroImage}
            alt=""
            fill
            className="image-slice"
            style={{ objectPosition: '30% 60%' }}
          />
        </div>
        <div ref={(el) => addToTilesRef(el, 28)} className="grid-tile relative">
          <Image
            ref={(el) => addToImageSlicesRef(el as unknown as HTMLImageElement, 5)}
            src={config.heroImage}
            alt=""
            fill
            className="image-slice"
            style={{ objectPosition: '50% 60%' }}
          />
        </div>
        <div
          ref={(el) => {
            addToTilesRef(el, 29);
            addToAccentTilesRef(el, 1);
          }}
          className="grid-tile grid-tile-accent"
        />
        <div ref={(el) => addToTilesRef(el, 30)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 31)} className="grid-tile" />

        {/* Row 5 */}
        <div ref={(el) => addToTilesRef(el, 32)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 33)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 34)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 35)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 36)} className="grid-tile relative">
          {titleLetters[6] && <div ref={(el) => addToTextTilesRef(el, 6)} className="tile-text">{titleLetters[6]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 37)} className="grid-tile relative">
          {titleLetters[7] && <div ref={(el) => addToTextTilesRef(el, 7)} className="tile-text">{titleLetters[7]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 38)} className="grid-tile">
          {config.ctaText && <button className="cta-button">{config.ctaText}</button>}
        </div>
        <div ref={(el) => addToTilesRef(el, 39)} className="grid-tile" />

        {/* Row 6 */}
        <div ref={(el) => addToTilesRef(el, 40)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 41)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 42)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 43)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 44)} className="grid-tile relative">
          {titleLetters[8] && <div ref={(el) => addToTextTilesRef(el, 8)} className="tile-text">{titleLetters[8]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 45)} className="grid-tile relative">
          {titleLetters[9] && <div ref={(el) => addToTextTilesRef(el, 9)} className="tile-text">{titleLetters[9]}</div>}
        </div>
        <div ref={(el) => addToTilesRef(el, 46)} className="grid-tile" />
        <div ref={(el) => addToTilesRef(el, 47)} className="grid-tile" />
      </div>
    </section>
  );
}
