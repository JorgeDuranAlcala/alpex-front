import AdjusterService from 'src/services/catalogs/adjuster.service';
import { AdjusterDto } from 'src/services/catalogs/dtos/adjuster.dto';


export const useGetAllAdjusters = () => {
    const getAllAdjusters = async () => {
        const adjusters = await AdjusterService.getAll();
        return adjusters;
    };

    return {
        getAllAdjusters
    };
};