import { CommentDto } from '@/services/accounts/dtos/comment.dto'
import CommentService from 'src/services/accounts/comment.service'

export const useAddComment = () => {
  const addComment = async (data: Partial<CommentDto>) => {
    await CommentService.addComment(data)
  }

  return {
    addComment
  }
}
