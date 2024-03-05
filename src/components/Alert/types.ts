export interface AlertProps {
  content?: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  effect?: 'light' | 'dark'
  closable?: boolean
  closeText?: string
  icon?: string
  center?: boolean
}

export interface AlertEmits {
  (e: 'close'): void
}

export interface AlertInstance {
  hide: () => void
}