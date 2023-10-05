import ExpertService from 'src/services/catalogs/expert.service';
import { ExpertDto } from 'src/services/catalogs/dtos/expert.dto';

export const useUpdateExpert = () => {
    const updateExpert = async (update: Partial<ExpertDto>) => {
        try {
            const resp = await ExpertService.update(update);

            return resp;
        } catch (error) {
            throw error;
        }
    };

    return { updateExpert };
};