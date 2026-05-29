import type { ReactNode } from "react"
import {
  Package,
  Tags,
  Warehouse,
  Inbox,
  Truck,
  ClipboardList,
  Trash2,
  FileText,
  Users,
  Building2,
  Shield,
  Lock,
  Database,
  Mail,
  UserCircle,
  Settings,
} from "lucide-react"

const registry: Record<string, ReactNode> = {
  package: <Package />,
  tags: <Tags />,
  warehouse: <Warehouse />,
  inbox: <Inbox />,
  truck: <Truck />,
  "clipboard-list": <ClipboardList />,
  "trash-2": <Trash2 />,
  "file-text": <FileText />,
  users: <Users />,
  "building-2": <Building2 />,
  shield: <Shield />,
  lock: <Lock />,
  database: <Database />,
  mail: <Mail />,
  "user-circle": <UserCircle />,
  settings: <Settings />,
}

export function getIcon(name: string, fallback?: ReactNode): ReactNode {
  return registry[name] ?? fallback ?? <Package />
}
