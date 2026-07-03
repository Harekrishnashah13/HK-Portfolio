import { useEffect, useState } from 'react';

/**
 * Custom hook to track the active section in the viewport as the user scrolls.
 * Uses IntersectionObserver for high performance and fallback to scroll calculation if needed.
 * 
 * @param sectionIds Array of element IDs corresponding to the sections to track
 * @param options IntersectionObserver options
 * @returns The active section ID
 */
export function useActiveSection(
  sectionIds: string[],
  options: IntersectionObserverInit = {
    rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies the upper-middle region
    threshold: [0, 0.1, 0.2]
  }
): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    // If we are server-side or no elements to track
    if (typeof window === 'undefined' || sectionIds.length === 0) {
      return;
    }

    // Keep track of which sections are intersecting and their ratios
    const intersectionState = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          intersectionState.set(id, entry.intersectionRatio);
        } else {
          intersectionState.delete(id);
        }
      });

      // Find the section with the highest intersection ratio
      let maxRatio = -1;
      let highestSectionId = '';

      intersectionState.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          highestSectionId = id;
        }
      });

      if (highestSectionId) {
        setActiveSection(highestSectionId);
      } else {
        // Fallback: If nothing is intersecting via observer (e.g. at the top of the page),
        // let's check current scroll position
        const scrollPosition = window.scrollY + 150;
        for (const sectionId of sectionIds) {
          const element = document.getElementById(sectionId);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe all valid section elements
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Run fallback check once on mount to establish initial active state
    const initialCheck = () => {
      const scrollPosition = window.scrollY + 150;
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (sectionIds.length > 0) {
        setActiveSection(sectionIds[0]);
      }
    };
    initialCheck();

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options.rootMargin, options.threshold]);

  return activeSection;
}
