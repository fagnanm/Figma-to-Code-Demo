import { useState } from "react";
import { Icon, Typography } from "@jobber/components";

// ── Types ──────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
  active?: boolean;
}

interface NavGroup {
  items: NavItem[];
}

interface SideNavProps {
  expanded?: boolean;
  onToggle?: () => void;
  activeItem?: string;
  fullWidth?: boolean;
}

// ── Icon helper ────────────────────────────────────────────────────

function NavIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name="menu" color="icon" />
      </div>
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="h-[17px] shrink-0 w-full flex items-center px-[8px]">
      <div className="w-full h-0 border-t border-[var(--color-border)]" />
    </div>
  );
}

// ── Dropdown chevron ───────────────────────────────────────────────

function DropdownChevron() {
  return (
    <div className="shrink-0 size-[16px] flex items-center justify-center">
      <Icon name="arrowDown" size="small" />
    </div>
  );
}

// ── Nav item row ───────────────────────────────────────────────────

function NavItemRow({
  item,
  expanded,
  active,
}: {
  item: NavItem;
  expanded: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`relative rounded-[8px] shrink-0 w-full ${
        !expanded ? "h-[40px] overflow-clip" : ""
      }`}
    >
      <div className="w-full">
        <div className="flex flex-col items-start w-full">
          <a
            className={`relative rounded-[8px] shrink-0 w-full h-[40px] flex items-center cursor-pointer hover:bg-[var(--color-surface--background--hover)] transition-colors ${
              active ? "bg-[var(--color-surface)]" : ""
            }`}
          >
            <div className="flex items-center w-full px-[8px] py-[4px]">
              <div className="flex flex-1 gap-[16px] items-center min-w-0">
                {item.icon}
                {expanded && (
                  <Typography fontWeight="semiBold">
                    {item.label}
                  </Typography>
                )}
              </div>
              {expanded && item.hasDropdown && (
                <DropdownChevron />
              )}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Nav definitions ────────────────────────────────────────────────

function useNavGroups(): NavGroup[] {
  return [
    {
      items: [
        {
          id: "create",
          label: "Create",
          icon: <Icon name="plus" color="icon" />,
        },
        {
          id: "home",
          label: "Home",
          icon: <Icon name="home" color="icon" />,
        },
        {
          id: "schedule",
          label: "Schedule",
          icon: <Icon name="calendar" color="icon" />,
        },
      ],
    },
    {
      items: [
        {
          id: "clients",
          label: "Clients",
          icon: <Icon name="clients" color="icon" />,
        },
        {
          id: "requests",
          label: "Requests",
          icon: <Icon name="request" color="icon" />,
        },
        {
          id: "quotes",
          label: "Quotes",
          icon: <Icon name="quote" color="icon" />,
        },
        {
          id: "jobs",
          label: "Jobs",
          icon: <Icon name="job" color="icon" />,
        },
        {
          id: "invoices",
          label: "Invoices",
          icon: <Icon name="invoice" color="icon" />,
        },
        {
          id: "payments",
          label: "Payments",
          icon: <Icon name="wallet" color="icon" />,
        },
      ],
    },
    {
      items: [
        {
          id: "marketing",
          label: "Marketing",
          hasDropdown: true,
          icon: <Icon name="marketing" color="icon" />,
        },
        {
          id: "receptionist",
          label: "Receptionist",
          icon: <Icon name="headset" color="icon" />,
        },
        {
          id: "insights",
          label: "Insights",
          hasDropdown: true,
          icon: <Icon name="reports" color="icon" />,
        },
        {
          id: "expenses",
          label: "Expenses",
          icon: <Icon name="expense" color="icon" />,
        },
        {
          id: "timesheets",
          label: "Timesheets",
          icon: <Icon name="timer" color="icon" />,
        },
        {
          id: "apps",
          label: "Apps",
          icon: <Icon name="apps" color="icon" />,
        },
      ],
    },
  ];
}

// ── Main export ────────────────────────────────────────────────────

export function SideNav({
  expanded = true,
  onToggle,
  activeItem = "home",
  fullWidth = false,
}: SideNavProps) {
  const navGroups = useNavGroups();

  return (
    <div
      className={`h-full shrink-0 bg-[var(--color-surface--background)] flex flex-col ${fullWidth ? "" : "transition-[width] duration-200"}`}
      style={
        fullWidth
          ? { width: "100%" }
          : { width: expanded ? 188 : 56 }
      }
    >
      {/* Logo */}
      <div className="h-[60px] shrink-0 w-[56px] flex items-center justify-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M22.2034 0.22035C22.0623 0.0793 21.8712 0 21.6717 0H9.52835C4.26595 0 0 4.26595 0 9.52835V21.6717C0 21.8712 0.0793 22.0623 0.22035 22.2034L3.79665 25.7796C3.9377 25.9207 4.1288 26 4.32835 26H16.4717C21.7341 26 26 21.7341 26 16.4717V4.32835C26 4.1288 25.9207 3.9377 25.7796 3.79665L22.2034 0.22035ZM3.47945 9.52835V22.2625C3.47945 22.4861 3.2097 22.5973 3.05175 22.44L1.9084 21.2966C1.8616 21.2498 1.83495 21.1861 1.83495 21.1192V9.52835C1.83495 5.2793 5.2793 1.83495 9.52835 1.83495H20.4354C20.5738 1.83495 20.6863 1.9474 20.6863 2.0852V16.4717C20.6863 18.7993 18.7993 20.6856 16.4723 20.6856H9.15525C8.9804 20.6856 8.8595 20.5114 8.9206 20.3476L9.3457 19.2043C9.3821 19.1061 9.4757 19.0411 9.58035 19.0411H16.1174C17.7327 19.0411 19.0417 17.732 19.0417 16.1168V3.7297C19.0417 3.59125 18.9293 3.47945 18.7908 3.47945H9.52835C6.18735 3.47945 3.47945 6.18735 3.47945 9.52835ZM8.79385 16.9559V9.88325C8.79385 9.28135 9.28135 8.79385 9.88325 8.79385H16.9559C17.0943 8.79385 17.2068 8.9063 17.2068 9.0441V16.1168C17.2068 16.7187 16.7193 17.2062 16.1174 17.2062H9.04475C8.9063 17.2062 8.79385 17.0937 8.79385 16.9559ZM24.165 16.4717C24.165 20.7207 20.7207 24.165 16.4717 24.165H5.56465C5.4262 24.165 5.31375 24.0526 5.31375 23.9148V9.52835C5.31375 7.2007 7.2007 5.3144 9.5277 5.3144H16.8447C17.0196 5.3144 17.1405 5.4886 17.0794 5.6524L16.6543 6.79575C16.6179 6.8939 16.5243 6.9589 16.4197 6.9589H9.8826C8.26735 6.9589 6.95825 8.268 6.95825 9.88325V22.2703C6.95825 22.4088 7.0707 22.5212 7.20915 22.5212H16.4717C19.8127 22.5212 22.5206 19.8133 22.5206 16.4723V3.7375C22.5206 3.51455 22.7903 3.40275 22.9482 3.56005L24.0916 4.7034C24.1384 4.7502 24.165 4.8139 24.165 4.88085V16.4717Z"
            fill="#032B3A"
          />
        </svg>
      </div>

      {/* Nav items */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-[8px]">
        <div className="flex flex-col gap-[4px]">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {gi > 0 && <Divider />}
              {group.items.map((item) => (
                <NavItemRow
                  key={item.id}
                  item={item}
                  expanded={expanded}
                  active={item.id === activeItem}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer — collapse/expand toggle */}
      <button
        onClick={onToggle}
        className="shrink-0 bg-sidebar cursor-pointer flex items-start px-[12px] pt-[8px] pb-[16px]"
      >
        <div
          className={`flex items-center justify-center transition-transform duration-200 ${
            expanded ? "" : "rotate-180"
          }`}
        >
          <div className="size-[24px] relative">
            <Icon name="longArrowLeft" color="icon" />
          </div>
        </div>
      </button>
    </div>
  );
}