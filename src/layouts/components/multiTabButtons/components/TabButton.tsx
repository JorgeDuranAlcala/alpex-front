import { useAppDispatch } from '@/store'
import { Chip } from '@mui/material'
import { useRouter } from 'next/router'
import { TabButton as TabButtonState } from '../interfaces/types'
import { activateTabButtonByIndex, removeTabButtonByIndex } from '../store/MultiTabButtonSlice'

interface TabButtonProps extends TabButtonState {
  index: number;
  baseLink: string;
}

export const TabButton = ({ index, text, isActive, link, baseLink, onClick }: TabButtonProps) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = (index: number) => {
    dispatch(activateTabButtonByIndex(index));

    if (link) {
      router.push(link)
    }
    if (onClick) {
      onClick(index)
    }
  }

  const handleDelete = (index: number) => {
    dispatch(removeTabButtonByIndex(index));
    if (isActive) {
      router.push(baseLink);
    }
  }

  return (
    <Chip

      // sx={{
      //   backgroundColor: isActive ? 'primary.main' : 'primary.light',
      //   color: isActive ? 'primary.contrastText' : 'primary.dark',
      // }}
      color={isActive ? 'primary' : 'default'}
      label={text}
      onClick={() => handleClick(index)}
      onDelete={() => handleDelete(index)}
    />
  )
}
