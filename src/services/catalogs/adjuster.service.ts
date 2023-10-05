import { CLAIMS_ROUTES } from 'src/configs/api';
import { AppAlpexApiGateWay } from 'src/services/app.alpex.api-getway';
import { AdjusterDto, AdjusterPaginationDto } from 'src/services/catalogs/dtos/adjuster.dto';
import { queryBuilder } from '../helper/queryBuilder';

class AdjusterService {
    async getAll(): Promise<AdjusterDto[]> {
        try {
            const { data } = await AppAlpexApiGateWay.get<Promise<AdjusterDto[]>>(`${CLAIMS_ROUTES.GET}?provider=Ajustador`);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.get<Promise<AdjusterDto>>(`${CLAIMS_ROUTES.GET_BY_ID}/${id}`);

            return data;
        } catch (error) {
            throw error;
        }
    }

    async add(adjuster: Partial<AdjusterDto>): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.post<Promise<AdjusterDto>>(`${CLAIMS_ROUTES.ADD}`, { ...adjuster });

            return data;
        } catch (error) {
            throw error;
        }
    }

    async update(update: Partial<AdjusterDto>): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.post<Promise<AdjusterDto>>(`${CLAIMS_ROUTES.UPDATE}`, { ...update });
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id: number): Promise<AdjusterDto> {
        try {
            const { data } = await AppAlpexApiGateWay.delete<Promise<AdjusterDto>>(`${CLAIMS_ROUTES.DELETE_BY_ID}/${id}`);
            
            return data;
        } catch (error) {
            throw error;
        }
    }

    async getAdjustersPagination(adjusterData: AdjusterPaginationDto, urlQ?: string) {
        try {
            const url = urlQ ? urlQ : queryBuilder(adjusterData.filters, `${CLAIMS_ROUTES.GET}`);
            const { data } = await AppAlpexApiGateWay.get(`${url}&itemsPerPage=${adjusterData.info.take}&page=${adjusterData.info.page}&provider=Ajustador`);
            
            return data;
        } catch (error) {
            const errMessage = String(error);
            throw new Error(errMessage);
        }
    }
}

export default new AdjusterService();