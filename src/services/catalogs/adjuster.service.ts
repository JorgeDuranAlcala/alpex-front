import { ADJUSTER_ROUTES } from 'src/configs/api';
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway';
import { AdjusterDto, AdjusterPaginationDto } from 'src/services/catalogs/dtos/adjuster.dto';
import { queryBuilder } from '../helper/queryBuilder';

class AdjusterService {
    async getAll(): Promise<AdjusterDto[]> {
        try {
            const { data } = await AppAlpexApiGateWay.get<Promise<AdjusterDto[]>>("/catalogs/adjuster-accounts/all?page=1&itemsPerPage=10");

            return data;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.get<Promise<AdjusterDto>>(`${ADJUSTER_ROUTES.GET_BY_ID}/${id}`);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async add(adjuster: Partial<AdjusterDto>): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.post<Promise<AdjusterDto>>(`${ADJUSTER_ROUTES.ADD}`, { ...adjuster });

            return data;
        } catch (error) {
            throw error;
        }
    }

    async updateById(id: number, update: Partial<AdjusterDto>): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.put<Promise<AdjusterDto>>(`${ADJUSTER_ROUTES.UPDATE}/${id}`, { ...update });
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id: number): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.delete<Promise<AdjusterDto>>(`${ADJUSTER_ROUTES.DELETE_BY_ID}/${id}`);
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAdjustersPagination(adjusterData: AdjusterPaginationDto, urlQ?: string) {
        try {
            const url = urlQ ? urlQ : queryBuilder(adjusterData.filters, `${ADJUSTER_ROUTES.GET}`);
            const { data } = await AppAlpexApiGateWay.get(`${url}&take=${adjusterData.info.take}&page=${adjusterData.info.page}`);
            
            return data;
        } catch (error) {
            const errMessage = String(error);
            throw new Error(errMessage);
        }
    }
}

export default new AdjusterService();