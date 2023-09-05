import CommentService from '@/services/comments/comment.service'
import { CommentDto } from '@/services/comments/dto/comment.dto'
import { useState } from 'react'

export const useGetAccountComments = () => {
  const [accountComments, setAccountComments] = useState<CommentDto[]>([])

  const getAccountComments = async (idAccount: number) => {
    const response = await CommentService.getAccountComments(idAccount)
    setAccountComments(() => {
      const newState = [...response]

      return newState
    })

    return response
  }

  return {
    getAccountComments,
    setAccountComments,
    accountComments
  }
}
