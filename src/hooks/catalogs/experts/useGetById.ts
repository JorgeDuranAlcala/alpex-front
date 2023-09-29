import { useEffect, useState } from 'react'
import ExpertService from 'src/services/catalogs/expert.service';
import { ExpertDto } from 'src/services/catalogs/dtos/expert.dto';

export const useGetExpertById = (id: number) => {
    const [expert, setExpert] = useState<ExpertDto>();

    useEffect(() => {
        ExpertService.findById(id)
            .then(expert => {
                setExpert(expert);
            })
            .catch(error => {
                throw new Error(error);
            });
    }, [id]);

    return { expert };
};