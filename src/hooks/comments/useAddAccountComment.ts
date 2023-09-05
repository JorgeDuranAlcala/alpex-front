import CommentService from '@/services/comments/comment.service'
import { CommentDto } from '@/services/comments/dto/comment.dto'

export const useAddAccountComment = () => {
  const addAccountComment = async (data: Partial<CommentDto>) => {
    await CommentService.addAccountComment(data)
  }

  return {
    addAccountComment
  }
}
