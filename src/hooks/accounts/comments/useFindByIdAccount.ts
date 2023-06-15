import { useState } from 'react'
import CommentService from 'src/services/accounts/comment.service'
import { CommentDto } from 'src/services/accounts/dtos/comment.dto'

export const useGetCommentsByIdAccount = () => {
  const [comments, setComments] = useState<CommentDto[]>([])

  const getComments = async (idAccount: number) => {
    const response = await CommentService.getByAllIdAccount(idAccount)
    setComments(() => {
      const newState = [...response]

      return newState
    })

    return response
  }

  return {
    getComments,
    setComments,
    comments
  }
}
