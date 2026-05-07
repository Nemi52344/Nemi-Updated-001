import { useState, useEffect, useRef, type ReactNode } from "react";

interface TabContentProps {
  activeKey: string;
  tabKey: string;
  children: ReactNode;
}

const TabContent = ({ activeKey, tabKey, children }: TabContentProps) => {
  const isActive = activeKey === tabKey;
  const [shouldRender, setShouldRender] = useState(isActive);
  const [animClass, setAnimClass] = useState(isActive ? "tab-visible" : "tab-hidden");
  const ref = useRef<HTMLDivElement>(null);
  const lastHeight = useRef<number>(0);

  useEffect(() => {
    if (isActive) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimClass("tab-visible"));
      });
    } else {
      // Capture height before hiding so parent doesn't collapse
      if (ref.current) {
        lastHeight.current = ref.current.offsetHeight;
      }
      setAnimClass("tab-hidden");
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  if (!shouldRender) return null;

  return (
    <div
      ref={ref}
      className={animClass}
      style={{
        transition: "opacity 0.3s ease, transform 0.3s ease",
        minHeight: !isActive && lastHeight.current ? `${lastHeight.current}px` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default TabContent;
