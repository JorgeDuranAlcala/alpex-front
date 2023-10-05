import ExpertService from 'src/services/catalogs/expert.service';

export const useGetAllExperts = () => {
    const getAllExperts = async () => {
        const experts = await ExpertService.getAll();

        return experts;
    };

    return {
        getAllExperts
    };
};