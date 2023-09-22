import { Card, CircularProgress, styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useContext } from 'react'
import { FollowUpContext } from '../../context/followUp/FollowUpContext'
import CustomPagination from './CustomPagination'
import TableHeader from './TableHeader'
import { columns } from './columns/Columns'

export const FollowUpTable = () => {
  const { isLoading, followUpGrid } = useContext(FollowUpContext)

  console.log('Fake data: ', followUpGrid)

  return (
    <CardTableContainer>
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <TableHeader />
        </>
      )}
      <DataGrid
        loading={isLoading}
        autoHeight
        disableSelectionOnClick
        rows={
          followUpGrid?.followUpGridList?.map(followUpItem => ({
            ...followUpItem,
            id: followUpItem.id
          })) || []
        }
        columns={columns}
        pagination
        pageSize={10}
        components={{
          Pagination: CustomPagination
        }}

        // className={'account-datagrid'}
      />
    </CardTableContainer>
  )
}

const CardTableContainer = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column'

  // gap: '16px',
}))
