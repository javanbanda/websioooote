'use client';

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ContactConfig } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  config: ContactConfig;
}

export default function Contact({ config }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const formBlock = section.querySelector('.form-block');
      const tiles = section.querySelectorAll('.contact-tile');

      if (formBlock) {
        gsap.fromTo(
          formBlock,
          { y: '6vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formBlock,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(
        tiles,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  if (config.formHeading.length === 0) return null;

  // The contact section always uses bg-inverted as its surface.
  // All colors here are relative to bg (the color of text on that surface).
  const borderSubtle = 'color-mix(in srgb, var(--color-bg) 20%, transparent)';
  const borderFaint = 'color-mix(in srgb, var(--color-bg) 10%, transparent)';
  const textMuted = 'color-mix(in srgb, var(--color-bg) 40%, transparent)';
  const textDim = 'color-mix(in srgb, var(--color-bg) 70%, transparent)';

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-[70] py-20 min-h-[60vh]"
      style={{ backgroundColor: 'var(--color-bg-inverted)', color: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {config.leftLinks.length > 0 && (
            <div className="flex flex-col gap-4">
              {config.leftLinks.map((link, i) => (
                <div
                  key={i}
                  className="contact-tile p-6 cursor-pointer"
                  style={{ border: `1px solid ${borderSubtle}` }}
                >
                  <span className="font-heading text-xl" style={{ color: 'var(--color-bg)' }}>
                    {link}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="form-block lg:col-span-1">
            {config.formHeading.map((line, i) => (
              <h2 key={i} className="font-heading text-4xl mb-2" style={{ color: 'var(--color-bg)' }}>
                {line}
              </h2>
            ))}
            {config.formHeadingAccent && (
              <h2 className="font-heading text-4xl mb-8" style={{ color: 'var(--color-accent)' }}>
                {config.formHeadingAccent}
              </h2>
            )}
            {config.formDescription && (
              <p className="font-body text-sm mb-8" style={{ color: textDim }}>
                {config.formDescription}
              </p>
            )}
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder={config.emailPlaceholder || 'YOUR EMAIL'}
                className="font-mono text-sm px-4 py-3 focus:outline-none transition-colors"
                style={{
                  background: 'transparent',
                  border: `1px solid ${borderSubtle}`,
                  color: 'var(--color-bg)',
                }}
              />
              {config.subscribeButtonText && (
                <button type="submit" className="cta-button w-full">
                  {config.subscribeButtonText}
                </button>
              )}
            </form>
          </div>

          {config.socialLinks.length > 0 && (
            <div className="flex flex-col gap-4">
              {config.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="contact-tile p-6 cursor-pointer"
                  style={{ border: `1px solid ${borderSubtle}`, textDecoration: 'none' }}
                >
                  <span className="font-heading text-xl" style={{ color: 'var(--color-bg)' }}>
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {(config.copyright || config.tagline) && (
          <div
            className="mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: `1px solid ${borderFaint}` }}
          >
            {config.copyright && (
              <span className="font-mono-label" style={{ color: textMuted }}>
                {config.copyright}
              </span>
            )}
            {config.tagline && (
              <span className="font-mono-label" style={{ color: textMuted }}>
                {config.tagline}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
