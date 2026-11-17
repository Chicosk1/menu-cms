import logomarca from '@/assets/logomarca.svg'
import { cn } from '@/lib/utils'
import { Armchair, ReceiptText, Sandwich, Tags } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/categories', label: 'Categorias', icon: Tags },
  { to: '/products', label: 'Produtos', icon: Sandwich },
  { to: '/spots', label: 'Mesas', icon: Armchair },
  { to: '/guest-checks', label: 'Comandas', icon: ReceiptText },
]

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col gap-8 border-r bg-sidebar px-4 py-6">
      <div className="flex flex-col items-center gap-2">
        <img src={logomarca} alt="Logomarca" className="h-auto w-44" />
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Painel administrativo
        </span>
      </div>

      <nav>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground hover:bg-muted',
                  )
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
