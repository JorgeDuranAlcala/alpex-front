import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";

interface ActionButtonsProps {
  icon: string;
  fontSize?: number;
  color?: string;
  onClick: () => void;
}

export const ActionButton = ({
  icon,
  fontSize = 24,
  color = '#2535A8',
  onClick
}: ActionButtonsProps) => {
  return (
    <IconButton onClick={onClick}>
      <Icon icon={icon} fontSize={fontSize} color={color} />
    </IconButton>
  )
}
