export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export interface MenuItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
}
