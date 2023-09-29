import AdjusterService from 'src/services/catalogs/adjuster.service';
import { AdjusterDto } from 'src/services/catalogs/dtos/adjuster.dto';

export const useAddAdjuster = () => {
    const saveAdjuster = async (data: Omit<AdjusterDto, 'id'>) => {
        const adjuster = await AdjusterService.add(data);
        return adjuster;
    };

    return {
        saveAdjuster
    };
};
