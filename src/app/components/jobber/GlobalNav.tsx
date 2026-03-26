import {
  Button,
  Icon,
  Text,
  Typography,
} from "@jobber/components";

// ── Types ──────────────────────────────────────────────────────────

interface GlobalNavProps {
  companyName?: string;
  isMobile?: boolean;
  isTrial?: boolean;
  onMenuToggle?: () => void;
}

// ── Action button wrapper ──────────────────────────────────────────

function ActionButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Button variation="tertiary" type="subtle">
      {children}
    </Button>
  );
}

// ── Hamburger icon (three horizontal lines) ────────────────────────

function HamburgerIcon() {
  return <Icon name="menu" color="icon" />;
}

// ── Desktop header ─────────────────────────────────────────────────

function DesktopHeader({
  companyName,
}: {
  companyName: string;
}) {
  return (
    <div className="flex items-center h-full px-[16px] pr-[8px] justify-between">
      {/* Company name */}
      <Text variation="subdued">{companyName}</Text>

      {/* Right — search + action icons */}
      <div className="flex items-center gap-[8px] shrink-0">
        {/* Search */}
        <button className="bg-input rounded-[8px] w-[140px] cursor-pointer hover:bg-[var(--color-surface--background)] transition-colors">
          <div className="flex items-center gap-[8px] pl-[8px] pr-[10px] py-[8px]">
            <div className="shrink-0 size-[24px] flex items-center justify-center">
              <Icon name="search" />
            </div>
            <span className="flex-1 text-foreground text-left">
              Search
            </span>
            <div className="bg-card rounded-[4px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.16)] size-[19px] flex items-center justify-center shrink-0">
              <span
                className="text-foreground"
                style={{ fontSize: "10px" }}
              >
                /
              </span>
            </div>
          </div>
        </button>

        {/* AI */}
        <ActionButton>
          <Icon name="sparkles" color="icon" />
        </ActionButton>

        {/* Notifications / bell */}
        <ActionButton>
          <Icon name="reminder" color="icon" />
        </ActionButton>

        {/* Help */}
        <ActionButton>
          <Icon name="help" color="icon" />
        </ActionButton>

        {/* Settings / cog */}
        <ActionButton>
          <Icon name="cog" color="icon" />
        </ActionButton>
      </div>
    </div>
  );
}

// ── Mobile header ──────────────────────────────────────────────────

function MobileHeader({
  onMenuToggle,
}: {
  onMenuToggle?: () => void;
}) {
  return (
    <div className="flex items-center h-full px-[16px] pr-[8px] justify-between">
      {/* Left — hamburger + Menu */}
      <button
        onClick={onMenuToggle}
        className="flex items-center gap-[12px] cursor-pointer shrink-0"
      >
        <HamburgerIcon />
        <Typography fontWeight="semiBold">Menu</Typography>
      </button>

      {/* Right — reduced icon set */}
      <div className="flex items-center gap-[8px] shrink-0">
        {/* Search (icon only) */}
        <ActionButton>
          <Icon name="search" color="icon" />
        </ActionButton>

        {/* AI / Sparkles */}
        <ActionButton>
          <Icon name="sparkles" color="icon" />
        </ActionButton>

        {/* Notifications / bell */}
        <ActionButton>
          <Icon name="reminder" color="icon" />
        </ActionButton>

        {/* Help */}
        <ActionButton>
          <Icon name="help" color="icon" />
        </ActionButton>

        {/* Settings / cog */}
        <ActionButton>
          <Icon name="cog" />
        </ActionButton>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────

export function GlobalNav({
  companyName = "{Company Name}",
  isMobile = false,
  onMenuToggle,
}: GlobalNavProps) {
  return (
    <div className="h-[60px] shrink-0 w-full">
      {isMobile ? (
        <MobileHeader onMenuToggle={onMenuToggle} />
      ) : (
        <DesktopHeader companyName={companyName} />
      )}
    </div>
  );
}