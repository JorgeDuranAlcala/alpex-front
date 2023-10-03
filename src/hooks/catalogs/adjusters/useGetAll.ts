import AdjusterService from 'src/services/catalogs/adjuster.service';

export const useGetAllAdjusters = () => {
    const getAllAdjusters = async () => {
        const adjusters = await AdjusterService.getAll();

        return adjusters;
    };

    return {
        getAllAdjusters
    };
};