import CommentService from '@/services/comments/comment.service'
import { CreateCommentDto } from '@/services/comments/dto/comment.dto'

export const useAddComment = () => {
  const addComment = async (data: CreateCommentDto) => {
    await CommentService.addComment(data)
  }

  return {
    addComment
  }
}
