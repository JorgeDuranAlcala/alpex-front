import AdjusterService from 'src/services/catalogs/adjuster.service';

export const useDeleteAdjuster = () => {
    const deleteAdjuster = async (id: number) => {
        try {
            const resp = await AdjusterService.deleteById(id);
            
            return resp;
        } catch (error) {
            throw error;
        }
    };

    return { deleteAdjuster };
};