import ExpertService from 'src/services/catalogs/expert.service';
import { ExpertDto } from 'src/services/catalogs/dtos/expert.dto';

export const useAddExpert = () => {
    const saveExpert = async (data: Omit<ExpertDto, 'id'>) => {
        const expert = await ExpertService.add(data);

        return expert;
    };

    return {
        saveExpert
    };
};