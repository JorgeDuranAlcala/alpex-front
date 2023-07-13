

export interface TabButton {
  isActive: boolean;
  text: string;
  link?: string;
  onClick?: (index: number | null) => void;
}

export interface BackButtonProps extends Omit<TabButton, 'isActive'> {
  isShow: boolean;
}




