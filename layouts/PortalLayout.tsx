import {
  Bot, Boxes, ChartNoAxesCombined, ChevronDown, ClipboardCheck, LayoutDashboard,
  LogOut, Menu, Settings, Store, Workflow
} from "lucide-react";
import { Drawer, Dropdown, type MenuProps } from "antd";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import BrandMark from "../components/BrandMark";
import { useAuth, type UserRole } from "../features/auth/AuthContext";

const links = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, end: true, roles: ["Executive", "Program Manager", "Store Manager", "Administrator"] },
  { to: "/portal/stores", label: "Stores", icon: Store, roles: ["Executive", "Program Manager", "Store Manager", "Administrator"] },
  { to: "/portal/assets", label: "Assets", icon: Boxes, roles: ["Program Manager", "Store Manager", "Administrator"] },
  { to: "/portal/approvals", label: "Approvals", icon: ClipboardCheck, roles: ["Program Manager", "Administrator"] },
  { to: "/portal/programs", label: "Programs", icon: Workflow, roles: ["Executive", "Program Manager", "Administrator"] },
  { to: "/portal/reports", label: "Reports", icon: ChartNoAxesCombined, roles: ["Executive", "Program Manager", "Administrator"] },
  { to: "/portal/assistant", label: "AI Assistant", icon: Bot, roles: ["Executive", "Program Manager", "Administrator"] },
  { to: "/portal/admin", label: "Administration", icon: Settings, roles: ["Administrator"] }
] satisfies Array<{ to: string; label: string; icon: typeof Store; end?: boolean; roles: UserRole[] }>;

function Navigation({ close }: { close?: () => void }) {
  const { user } = useAuth();
  return (
    <nav className="portal-nav" aria-label="Portal navigation">
      {links.filter((link) => user && link.roles.includes(user.role)).map(({ to, label, icon: Icon, end }) => (
        <NavLink key={to} to={to} end={end} onClick={close}>
          <Icon size={18} /><span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

const pageNames: Record<string, string> = {
  stores: "Stores", approvals: "Approvals", assets: "Assets", programs: "Programs",
  reports: "Reports", assistant: "AI Assistant", admin: "Administration"
};

export default function PortalLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathPart = location.pathname.split("/")[2];
  const pageName = pageNames[pathPart] ?? "Dashboard";

  const menuItems: MenuProps["items"] = [
    { key: "role", label: <span className="menu-role">Signed in as {user?.role}</span>, disabled: true },
    { type: "divider" },
    { key: "logout", label: "Sign out", icon: <LogOut size={15}/> }
  ];

  return (
    <div className="portal-shell">
      <aside className="sidebar">
        <BrandMark compact />
        <Navigation />
        <div className="sidebar-footer"><span>CLIENT PROGRAM</span><strong>North America Retail</strong></div>
      </aside>
      <Drawer placement="left" width={280} open={open} onClose={() => setOpen(false)} className="mobile-drawer">
        <BrandMark compact /><Navigation close={() => setOpen(false)} />
      </Drawer>
      <div className="portal-main">
        <header className="portal-topbar">
          <button className="menu-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
          <div className="topbar-context"><span>RETAILVISION / {pageName.toUpperCase()}</span><strong>Program Year 2026</strong></div>
          <Dropdown menu={{ items: menuItems, onClick: ({ key }) => { if (key === "logout") { logout(); navigate("/login"); } } }} trigger={["click"]}>
            <button className="user-chip" aria-label="Open account menu">
              <span>{user?.initials}</span>
              <div><strong>{user?.name}</strong><small>{user?.role}</small></div>
              <ChevronDown size={15}/>
            </button>
          </Dropdown>
        </header>
        <Outlet />
      </div>
    </div>
  );
}
