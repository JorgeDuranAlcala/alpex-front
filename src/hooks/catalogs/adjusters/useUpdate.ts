import AdjusterService from 'src/services/catalogs/adjuster.service';
import { AdjusterDto } from 'src/services/catalogs/dtos/adjuster.dto';

export const useUpdateAdjuster = () => {
    const updateAdjuster = async (id: number, update: Partial<AdjusterDto>) => {
        try {
            const resp = await AdjusterService.updateById(id, update);
            
            return resp;
        } catch (error) {
            throw error;
        }
    };

    return { updateAdjuster };
};