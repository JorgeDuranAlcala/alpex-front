import { SelectChangeEvent } from "@mui/material";

export interface InputSelectProps {
  selectedValue: string;
  onChange: (e: SelectChangeEvent<string>) => void;
}
