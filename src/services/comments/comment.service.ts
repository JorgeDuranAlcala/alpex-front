import { ACCOUNT_COMMENTS } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { CommentDto } from './dto/comment.dto'

class CommentService {
  async addAccountComment(comment: Partial<CommentDto>): Promise<string> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<string>>(ACCOUNT_COMMENTS.ADD_ACCOUNT_COMMENT, comment)

      return data
    } catch (error) {
      throw error
    }
  }

  async getAccountComments(idAccount: number): Promise<CommentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CommentDto[]>>(
        `${ACCOUNT_COMMENTS.GET_ACCOUNT_COMMENTS}/${idAccount}`
      )

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CommentService()
