export interface TabButton {
  isActive: boolean
  text: string
  link?: string
  icon?: ReactNode
  onClick?: (index: number | null) => void
}

export interface BackButtonProps extends Omit<TabButton, 'isActive'> {
  isShow: boolean
}

export interface CreateTabButtonsProps {
  tabButtons: TabButton[]
  baseLink: string
  backButtons: BackButtonProps
}
