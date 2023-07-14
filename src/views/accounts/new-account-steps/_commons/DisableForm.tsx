import { ReactNode, useContext, useEffect, useRef } from 'react';
import { SecondViewContext } from '../Security/components/secondView/SecondViewContext';

interface DisableFormProps {
  children: ReactNode;
  isDisabled: boolean;
}

export const DisableForm = ({ children, isDisabled }: DisableFormProps) => {

  const { activeView } = useContext(SecondViewContext)
  console.log('disableForm', isDisabled)

  const $fieldSet = useRef<HTMLFieldSetElement | null>(null);


  useEffect(() => {

    // * Deshabilitar todos los inputs + + + + + + +
    const disableAllInputs = ($fieldSet: HTMLFieldSetElement) => {
      const allInputs = $fieldSet.querySelectorAll('.MuiInputBase-input');

      // console.log({ allInputs })

      allInputs.forEach((input: any) => {
        input.classList.add('Mui-disabled');
        input.style.pointerEvents = 'none';
        input.parentElement.parentElement.style.pointerEvents = 'none';
      });
    }

    // * + + + + + + + + + + + + + + + + + + + + + + + + + + + +

    // * Deshabilitar todos los botones a excepción de los elementos de segunda vista
    const disableButtons = ($fieldSet: HTMLFieldSetElement) => {
      const allButtons = $fieldSet.querySelectorAll('.MuiButtonBase-root');

      // console.log({ allButtons })

      allButtons.forEach((button: any) => {
        if (button.classList.contains('second-view-switch-button')) return;
        if (button.classList.contains('second-view-undo-button')) {
          button.style.display = 'none';
        };
        button.classList.add('Mui-disabled');

        // button.style.pointerEvents = 'none';
      })

    }

    // * + + + + + + + + + + + + + + + + + + + + + + + + + + + +


    // * Deshabilitar todos los selects + + + + + + +
    const disableAllSelects = ($fieldSet: HTMLFieldSetElement) => {
      const allSelects = $fieldSet.querySelectorAll('.MuiSelect-select');

      // console.log({ allSelects })

      allSelects.forEach((select: any) => {
        select.classList.add('Mui-disabled');
        select.style.pointerEvents = 'none';
      })
    }

    // * + + + + + + + + + + + + + + + + + + + + + + + + + + + +


    // * Deshabilitar todos los switch buttons + + + + + + +
    const disableAllSwitchButtons = ($fieldSet: HTMLFieldSetElement) => {
      const allSwitchButtons = $fieldSet.querySelectorAll('.MuiSwitch-switchBase');

      // console.log({ allSwitchButtons })

      allSwitchButtons.forEach((switchButton: any) => {

        // console.log({ switchButton })

        switchButton.classList.add('Mui-disabled');
        switchButton.style.pointerEvents = 'none';
      });
    }

    // * + + + + + + + + + + + + + + + + + + + + + + + + + + + +

    // * Deshabilitar la sección de action-buttons (icono de borrar formulario)
    const disableSectionButtons = ($fieldSet: HTMLFieldSetElement) => {
      const sectionButtons = $fieldSet.querySelector('.section.action-buttons');

      // console.log('sectionButtons', sectionButtons);
      if (sectionButtons && sectionButtons instanceof HTMLElement) {
        sectionButtons.style.display = 'none';
        sectionButtons.style.pointerEvents = 'none';
      }
    }

    // * + + + + + + + + + + + + + + + + + + + + + + + + + + + +


    // * Pintar de color "disabled" los headers del formulario 4 - Sublimits
    const disableSublimitHeaderCards = ($fieldSet: HTMLFieldSetElement) => {
      const sublimitHeaderCards = $fieldSet.querySelectorAll('.sublimits-generic-card-header');

      sublimitHeaderCards.forEach((sublimitHeaderCard: any) => {

        // console.log({ sublimitHeaderCard })

        if (sublimitHeaderCard && sublimitHeaderCard instanceof HTMLElement) {

          sublimitHeaderCard.style.backgroundColor = '#4c4e641f';
        }
      });

      const sublimitHeaderCardsText = $fieldSet.querySelectorAll('.sublimits-generic-card-header-text');

      sublimitHeaderCardsText.forEach((sublimitHeaderCardText: any) => {

        // console.log({ sublimitHeaderCardText })

        if (sublimitHeaderCardText && sublimitHeaderCardText instanceof HTMLElement) {

          sublimitHeaderCardText.style.color = 'rgba(76, 78, 100, 0.50)';
          sublimitHeaderCardText.style.fontWeight = '600';
        }
      });

    }

    // * + + + + + + + + + + + + + + + + + + + + + + + + + + + +



    if ($fieldSet.current && isDisabled) {

      disableButtons($fieldSet.current);

      // * Se implementa un timeout porque al cambiar de una vista u otra, se vuelven a habilitar los inputs
      setTimeout(() => {
        if ($fieldSet.current && isDisabled) {

          disableSublimitHeaderCards($fieldSet.current)
          disableAllInputs($fieldSet.current);
          disableAllSelects($fieldSet.current);
          disableAllSwitchButtons($fieldSet.current);
          disableSectionButtons($fieldSet.current);
        }

      }, 500);
    }


  }, [isDisabled, activeView])

  return (
    <fieldset
      ref={$fieldSet}
      disabled={isDisabled}
      style={{ border: 'none' }}
    >
      {children}
    </fieldset>
  )
}
