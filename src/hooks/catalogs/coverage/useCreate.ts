import { useState } from 'react';
import CoverageService from 'src/services/catalogs/coverage.service';
import { CoverageInputDto } from 'src/services/catalogs/dtos/coverage.dto';

interface StatusCreatedCoverage {
  isCreating: boolean;
  isCreated: boolean;
  message?: string;
}

export const useCreateCoverage = () => {
  const [status, setStatus] = useState<StatusCreatedCoverage>({
    isCreating: false,
    isCreated: false,
  })


  const createCoverage = async (coverage: CoverageInputDto) => {
    setStatus({
      isCreating: true,
      isCreated: false
    });
    const data = await CoverageService.create(coverage)

    // console.log(data);

    if (data.coverage === coverage.coverage) {
      setStatus({
        isCreating: false,
        isCreated: true
      });
    } else {
      setStatus({
        isCreating: false,
        isCreated: false,
        message: 'Problems were encountered when creating the new coverage'
      });
    }
  }



  return {
    status,
    createCoverage
  }
}
