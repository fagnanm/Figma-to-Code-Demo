import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { SideNav } from "./SideNav";
import { GlobalNav } from "./GlobalNav";

// ── Constants ──────────────────────────────────────────────────────

const MOBILE_BREAKPOINT = 640;

// ── Types ──────────────────────────────────────────────────────────

interface UIShellProps {
  companyName?: string;
  children?: React.ReactNode;
  activeItem?: string;
}

// ── Hook: container width ──────────────────────────────────────────

function useContainerWidth(
  ref: React.RefObject<HTMLElement | null>,
) {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return width;
}

// ── Main export ────────────────────────────────────────────────────

export function UIShell({
  companyName = "{Company Name}",
  children,
  activeItem = "home",
}: UIShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);
  const isMobile = containerWidth <= MOBILE_BREAKPOINT;

  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setMobileMenuOpen(false);
  }, [isMobile]);

  const handleMenuToggle = useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen((v) => !v);
    } else {
      setSidebarExpanded((v) => !v);
    }
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="flex w-full h-full overflow-hidden relative"
    >
      {/* Sidebar — desktop: static, mobile: overlay from left */}
      {!isMobile && (
        <SideNav
          expanded={sidebarExpanded}
          onToggle={() => setSidebarExpanded((v) => !v)}
          activeItem={activeItem}
        />
      )}

      {/* Mobile sidebar overlay */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 z-20 transition-opacity duration-300 ${
              mobileMenuOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Slide-in sidebar */}
          <div
            className={`absolute top-0 bottom-0 left-0 z-30 w-1/2 transition-transform duration-300 ease-in-out ${
              mobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >
            <SideNav
              expanded
              fullWidth
              onToggle={() => setMobileMenuOpen(false)}
              activeItem={activeItem}
            />
          </div>
        </>
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0">
        <GlobalNav
          companyName={companyName}
          isMobile={isMobile}
          onMenuToggle={handleMenuToggle}
        />
        <div className="flex flex-1 min-h-0 flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}