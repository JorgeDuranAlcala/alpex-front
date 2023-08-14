import { Box, ClickAwayListener, Grow, MenuList, Paper, Popper, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React from 'react';

interface SelectAnchorProps extends SelectProps {
  children: React.ReactNode
}

export const SelectAnchor = (props: SelectAnchorProps) => {

  const $anchorRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if ($anchorRef.current) {
      $anchorRef.current.blur();
    }
  };

  const handleChange = (event: any, child: any) => {
    // console.log(event, child);
    if (props.onChange) {
      props.onChange(event, child);
    }
    setOpen(false); // Cierra el Popper después de seleccionar un valor
  };

  const handleMenuItemClick = (value: unknown) => () => {
    // console.log(value)

    // Llamar a la función handleChange
    handleChange(
      {
        target: {
          value,
          name: props.name,
        },
      } as SelectChangeEvent<unknown>,
      value
    );
  };

  return (
    <Box className="select-anchor" sx={{ width: '100%' }}>
      <Select
        {...props}
        ref={$anchorRef}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleChange}
        MenuProps={{
          classes: {
            paper: 'custom-menu-paper-select-anchor', // Clase CSS personalizada para el menú, ver ./styles/globals.scss
          },
        }}
        sx={{
          width: '100%',
          ">div[aria-expanded='false'] ~ .MuiOutlinedInput-notchedOutline": {

            borderColor: 'rgba(76, 78, 100, 0.22)',
            borderWidth: '1px',

          },
        }}

      ></Select>

      <Popper
        open={open}
        anchorEl={$anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{ zIndex: 2000, }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
              elevation={10} sx={{

              }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  sx={{
                    maxHeight: '100vh',
                    minWidth: $anchorRef.current?.clientWidth,
                    overflowY: 'auto',

                  }}
                >

                  {React.Children.map(props.children, (child) =>
                    React.isValidElement(child)
                      ? React.cloneElement(child as React.ReactElement<any>, {
                        onClick: (event: any) => {
                          // Llama al onClick original del MenuItem, si existe
                          if (child.props.onClick) {
                            child.props.onClick(event);
                          }

                          // Llama a la función handleMenuItemClick con el valor del MenuItem
                          handleMenuItemClick(child.props.value)();
                        },
                      })
                      : child
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}
