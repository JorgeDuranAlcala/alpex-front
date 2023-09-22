import { Box, Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { CollapsibleRowProps } from "../interfaces/CollapsibleRowTableProps";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";

export const CollapsibleRow = ({ children, collapsibleRow, colSpan }: CollapsibleRowProps) => {

  const [open, setOpen] = useState(false);


  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row" colSpan={colSpan}

          onClick={() => setOpen(!open)}
          padding="none"
          sx={{
            backgroundColor: 'rgba(45, 103, 235, 0.08)',
            padding: '8px 16px!important',
            borderBottom: 'none',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>

            {collapsibleRow}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }} colSpan={colSpan}>
          <Collapse in={open} timeout="auto" >
            {children}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}