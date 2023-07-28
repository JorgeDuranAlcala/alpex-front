import { Box } from '@mui/material'
import { ReactNode, useContext, useEffect, useRef } from 'react'
import { SecondViewContext } from '../Security/components/secondView/SecondViewContext'

interface DisableFormProps {
  children: ReactNode
  isDisabled?: boolean
  sg?: number
}

export const DisableForm = ({ children, isDisabled, sg = 500 }: DisableFormProps) => {
  const { activeView } = useContext(SecondViewContext)
  const $fieldSet = useRef<HTMLFieldSetElement | null>(null)

  useEffect(() => {
    // Deshabilitar todos los inputs
    const disableAllInputs = ($fieldSet: HTMLFieldSetElement) => {
      const allInputs = $fieldSet.querySelectorAll('.MuiInputBase-input')

      allInputs.forEach((input: any) => {
        input.classList.add('Mui-disabled')
        input.style.pointerEvents = 'none'
        input.parentElement.parentElement.style.pointerEvents = 'none'
      })
    }

    // Deshabilitar todos los botones a excepción de los elementos de segunda vista
    const disableButtons = ($fieldSet: HTMLFieldSetElement) => {
      const allButtons = $fieldSet.querySelectorAll('.MuiButtonBase-root')

      allButtons.forEach((button: any) => {
        if (button.classList.contains('second-view-switch-button')) return
        if (button.classList.contains('second-view-undo-button')) {
          button.style.display = 'none'
        }
        button.classList.add('Mui-disabled')
      })
    }

    // Deshabilitar todos los selects
    const disableAllSelects = ($fieldSet: HTMLFieldSetElement) => {
      const allSelects = $fieldSet.querySelectorAll('.MuiSelect-select')

      allSelects.forEach((select: any) => {
        select.classList.add('Mui-disabled')
        select.style.pointerEvents = 'none'
      })
    }

    // Deshabilitar todos los switch buttons
    const disableAllSwitchButtons = ($fieldSet: HTMLFieldSetElement) => {
      const allSwitchButtons = $fieldSet.querySelectorAll('.MuiSwitch-switchBase')

      allSwitchButtons.forEach((switchButton: any) => {
        switchButton.classList.add('Mui-disabled')
        switchButton.style.pointerEvents = 'none'
      })
    }

    // Deshabilitar la sección de action-buttons (icono de borrar formulario)
    const disableSectionButtons = ($fieldSet: HTMLFieldSetElement) => {
      const sectionButtons = $fieldSet.querySelector('.section.action-buttons')

      if (sectionButtons && sectionButtons instanceof HTMLElement) {
        sectionButtons.style.display = 'none'
        sectionButtons.style.pointerEvents = 'none'
      }
    }

    // Pintar de color "disabled" los headers del formulario 4 - Sublimits
    const disableSublimitHeaderCards = ($fieldSet: HTMLFieldSetElement) => {
      const sublimitHeaderCards = $fieldSet.querySelectorAll('.sublimits-generic-card-header')

      sublimitHeaderCards.forEach((sublimitHeaderCard: any) => {
        if (sublimitHeaderCard && sublimitHeaderCard instanceof HTMLElement) {
          sublimitHeaderCard.style.backgroundColor = '#4c4e641f'
        }
      })

      const sublimitHeaderCardsText = $fieldSet.querySelectorAll('.sublimits-generic-card-header-text')

      sublimitHeaderCardsText.forEach((sublimitHeaderCardText: any) => {
        if (sublimitHeaderCardText && sublimitHeaderCardText instanceof HTMLElement) {
          sublimitHeaderCardText.style.color = 'rgba(76, 78, 100, 0.50)'
          sublimitHeaderCardText.style.fontWeight = '600'
        }
      })
    }

    if ($fieldSet.current && isDisabled) {
      disableButtons($fieldSet.current)

      // Se implementa un timeout porque al cambiar de una vista u otra, se vuelven a habilitar los inputs
      setTimeout(() => {
        if ($fieldSet.current && isDisabled) {
          disableSublimitHeaderCards($fieldSet.current)
          disableAllInputs($fieldSet.current)
          disableAllSelects($fieldSet.current)
          disableAllSwitchButtons($fieldSet.current)
          disableSectionButtons($fieldSet.current)
        }
      }, sg)
    }
  }, [isDisabled, activeView, sg])

  return (
    <Box component='fieldset' ref={$fieldSet} disabled={isDisabled} sx={{ border: 'none', width: '100%' }}>
      {children}
    </Box>
  )
}
