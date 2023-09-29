import ExpertService from 'src/services/catalogs/expert.service';

export const useDeleteExpert = () => {
    const deleteExpert = async (id: number) => {
        try {
            const resp = await ExpertService.deleteById(id);
            return resp;
        } catch (error) {
            throw error;
        }
    };

    return { deleteExpert };
};