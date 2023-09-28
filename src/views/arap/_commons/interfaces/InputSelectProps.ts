import { SelectChangeEvent } from "@mui/material";

export interface InputSelectProps {
  selectedValue: string;
  isDisabled?: boolean;
  onChange: (e: SelectChangeEvent<string>) => void;
}
