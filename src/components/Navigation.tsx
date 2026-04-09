'use client';

import type { NavigationConfig } from '@/lib/config';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  config: NavigationConfig;
}

export default function Navigation({ config }: NavigationProps) {
  if (!config.logo) return null;

  return (
    <nav className="nav-fixed">
      <div className="nav-logo">{config.logo}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {config.links.length > 0 && (
          <div className="nav-links">
            {config.links.map((link, index) => (
              <a key={index} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
