import { useEffect, useState } from 'react'
import AdjusterService from 'src/services/catalogs/adjuster.service';
import { AdjusterDto } from 'src/services/catalogs/dtos/adjuster.dto';

export const useGetAdjusterById = (id: number) => {
    const [adjuster, setAdjuster] = useState<AdjusterDto>();

    useEffect(() => {
        AdjusterService.findById(id)
            .then(adjuster => {
                setAdjuster(adjuster);
            })
            .catch(error => {
                throw new Error(error);
            });
    }, [id]);

    return { adjuster };
};