import { EXPERT_ROUTES } from 'src/configs/api';
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway';
import { ExpertDto, ExpertPaginationDto } from 'src/services/catalogs/dtos/expert.dto';
import { queryBuilder } from '../helper/queryBuilder';

class ExpertService {
  async getAll(): Promise<ExpertDto[]> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ExpertDto[]>>("/catalogs/expert-accounts/all?page=1&itemsPerPage=10");
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<ExpertDto> {
    try {
      const { data } = await AppAlpexApiGateWay.get<Promise<ExpertDto>>(`${EXPERT_ROUTES.GET_BY_ID}/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async add(expert: Partial<ExpertDto>): Promise<ExpertDto> {
    try {
      const { data } = await AppAlpexApiGateWay.post<Promise<ExpertDto>>(`${EXPERT_ROUTES.ADD}`, { ...expert });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, update: Partial<ExpertDto>): Promise<ExpertDto> {
    try {
      const { data } = await AppAlpexApiGateWay.put<Promise<ExpertDto>>(`${EXPERT_ROUTES.UPDATE}/${id}`, { ...update });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<ExpertDto> {
    try {
      const { data } = await AppAlpexApiGateWay.delete<Promise<ExpertDto>>(`${EXPERT_ROUTES.DELETE_BY_ID}/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getExpertsPagination(expertData: ExpertPaginationDto, urlQ?: string) {
    try {
      const url = urlQ ? urlQ : queryBuilder(expertData.filters, `${EXPERT_ROUTES.GET}`);
      const { data } = await AppAlpexApiGateWay.get(`${url}&take=${expertData.info.take}&page=${expertData.info.page}`);
      return data;
    } catch (error) {
      const errMessage = String(error);
      throw new Error(errMessage);
    }
  }
}

export default new ExpertService();