import { Box, Button, Checkbox, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField, Typography, styled } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useCreateCoverage } from '@/hooks/catalogs/coverage/useCreate';

const FormStyled = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '40px',

  marginTop: '40px',
}));

const ActionButtonsContainer = styled(Box)(() => ({
  display: 'flex', alignItems: 'center', gap: '16px', alignSelf: 'flex-end'
}))

interface FormAddNewCoverageProps {
  onCreated: () => void;
  onCancel: () => void;
}

export const FormAddNewCoverage = ({ onCreated, onCancel }: FormAddNewCoverageProps) => {
  const { status, createCoverage } = useCreateCoverage();

  // console.log(status, createCoverage);

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (status.isCreated) {
      onCreated();
    }

  }, [status, onCreated]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coverageNameInput = e.currentTarget.elements.namedItem('coverageName') as HTMLInputElement;
    const yesAndLucCheckbox = e.currentTarget.elements.namedItem('yesAndLuc') as HTMLInputElement;
    const coverageTypeRadio = e.currentTarget.elements.namedItem('coverageType') as HTMLInputElement;

    if (coverageNameInput && yesAndLucCheckbox && coverageTypeRadio) {
      const coverage = coverageNameInput.value.trim();

      if (!coverage) {
        setErrorMessage('Name of coverage is required');
      }

      const yesAndLuc = yesAndLucCheckbox.checked;
      const coverageType = coverageTypeRadio.value;

      // console.log(coverage, yesAndLuc, coverageType);

      createCoverage({
        coverage,
        yesAndLuc,
        coverageType,
      });
    }
  }

  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const isEmptyValue = e.target.value.trim().replaceAll(' ', '').length === 0;
    const isMaxCharacters = e.target.value.length > 40;
    const isMaxWords = e.target.value.split(' ').length > 4;


    if (isEmptyValue) {
      setErrorMessage('Name of coverage is required');

    } else if (isMaxCharacters || isMaxWords) {

      const maxCharactersMessage = isMaxCharacters ? 'Must have 40 or less characters' : '';
      const maxWordsMessage = isMaxWords ? 'Must have 4 words or less' : '';

      setErrorMessage(maxCharactersMessage || maxWordsMessage);

      // e.target.value = e.target.value.slice(0, -1);

    } else {
      setErrorMessage(null);
    }
  }

  return (
    <FormStyled onSubmit={handleSubmit}>
      <TextField
        name="coverageName"
        label="Name of Coverage"
        variant="outlined"
        onChange={handleOnChangeName}
        error={!!errorMessage}
        helperText={errorMessage}
        sx={{ height: '75px' }}
        required
      />
      <FormControlLabel name="yesAndLuc" control={<Checkbox />} label="Yes/Luc" />
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Business Interruption"
        name="coverageType"
      >
        <FormControlLabel value="Business Interruption" control={<Radio />} label="Business Interruption" />
        <FormControlLabel value="Standard" control={<Radio />} label="Standard" />
        <FormControlLabel value="Special" control={<Radio />} label="Special" />
      </RadioGroup>

      {status.message ? (
        <Typography color="error">{status.message}</Typography>
      ) : null}

      <ActionButtonsContainer>
        {status.isCreating ? (
          <>
            <CircularProgress size={45} />
            <span>creating...</span>
          </>
        ) : (
          <>
            <Button variant="text" color="primary" onClick={onCancel}>CANCEL</Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!!errorMessage}
            >CREATE</Button>
          </>
        )}
      </ActionButtonsContainer>

    </FormStyled>
  )
}
