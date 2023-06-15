import { ACCOUNT_COMMENTS } from 'src/configs/api'
import { AppAlpexApiGateWay } from '../app.alpex.api-getway'
import { CommentDto } from './dtos/comment.dto'

class CommentService {
  async addComment(comment: Partial<CommentDto>): Promise<string> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<string>>(ACCOUNT_COMMENTS.ADD, comment)

      return data
    } catch (error) {
      throw error
    }
  }

  async getByAllIdAccount(idAccount: number): Promise<CommentDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<CommentDto[]>>(`${ACCOUNT_COMMENTS.GET_ALL}/${idAccount}`)

      return data
    } catch (error) {
      throw error
    }
  }
}

export default new CommentService()
