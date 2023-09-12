import { COMMENTS } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { CreateCommentDto, ResCommentDto } from './dto/comment.dto'

class CommentService {
  async addComment(comment: CreateCommentDto): Promise<string> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<string>>(COMMENTS.ADD_COMMENT, comment)

      return data
    } catch (error) {
      throw error
    }
  }

  async getAccountComments(idAccount: number): Promise<ResCommentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ResCommentDto[]>>(
        `${COMMENTS.GET_ACCOUNT_COMMENTS}/${idAccount}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CommentService()
