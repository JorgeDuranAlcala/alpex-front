import ExpertService from 'src/services/catalogs/expert.service';
import { ExpertDto } from 'src/services/catalogs/dtos/expert.dto';

export const useUpdateExpert = () => {
    const updateExpert = async (id: number, update: Partial<ExpertDto>) => {
        try {
            const resp = await ExpertService.updateById(id, update);

            return resp;
        } catch (error) {
            throw error;
        }
    };

    return { updateExpert };
};