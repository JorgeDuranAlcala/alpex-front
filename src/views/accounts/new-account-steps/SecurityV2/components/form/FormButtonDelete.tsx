import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Icon } from '@mui/material';

interface FormButtonDeleteProps {
  onClick: () => void;
}

export const FormButtonDelete = ({ onClick }: FormButtonDeleteProps) => {

  return (
    <div
      className='section action-buttons'
      style={{ float: 'right', marginRight: 'auto', marginBottom: '20px' }}
    >
      <Icon
        component={DeleteOutlineIcon}
        amplitude={10}
        style={{
          fontSize: '34px',
          cursor: 'pointer',
          zIndex: '1000'
        }}
        onClick={onClick}
      />
    </div>
  )
}
