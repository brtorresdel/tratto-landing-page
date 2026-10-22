'use client';

import { useEffect } from 'react';

export function ScrollbarThemeSync() {
  useEffect(() => {
    let ticking = false;

    function updateScrollbarColor() {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        document.documentElement.removeAttribute('data-scrollbar');
        return;
      }

      const scrollRatio = window.scrollY / maxScroll;
      const thumbHeight = Math.max(30, (clientHeight / scrollHeight) * clientHeight);
      const thumbTop = scrollRatio * (clientHeight - thumbHeight);
      const thumbBottom = thumbTop + thumbHeight;

      const darkSections = document.querySelectorAll<HTMLElement>('[data-dark-section="true"]');

      let isOverDark = false;
      for (const section of darkSections) {
        const rect = section.getBoundingClientRect();
        // Verifica se o thumb da barra de rolagem sobrepõe verticalmente a seção escura
        if (rect.top <= thumbBottom && rect.bottom >= thumbTop) {
          isOverDark = true;
          break;
        }
      }

      if (isOverDark) {
        document.documentElement.setAttribute('data-scrollbar', 'light');
      } else {
        document.documentElement.removeAttribute('data-scrollbar');
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollbarColor();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollbarColor();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.documentElement.removeAttribute('data-scrollbar');
    };
  }, []);

  return null;
}
