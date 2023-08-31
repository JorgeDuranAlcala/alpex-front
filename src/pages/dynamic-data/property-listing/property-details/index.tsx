// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'

// ** Next
import { useRouter } from 'next/router'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Container } from 'src/styles/Dashboard/dashboard'

// ** Styled Component Import
import BasicInfo from '@/views/dynamic-data/property-listing/property-details/BasicInfo'
import ConstructionDetail from '@/views/dynamic-data/property-listing/property-details/ConstructionDetails'
import Location from '@/views/dynamic-data/property-listing/property-details/Location'
import PropertyHeader from '@/views/dynamic-data/property-listing/property-details/PropertyHeader'

// ** Import services
import PropertiesServices from '@/services/dynamic-data/properties.mock-service'

// ** Import Dto
import { BasicInfoDto, ConstructionDto, LocationDto, PropertyGeneralDto } from '@/services/dynamic-data/dtos/propertyListing.dto'

const DynamicDataDashboard = () => {
  // Hooks
  const router = useRouter()

  const [headerData, setHeaderData] = useState<PropertyGeneralDto>({
    properyId: '',
    replacementValue: '',
    institution: '',
    typology: '',
    crestZone: ''
  })
  const [basicInfoData, setBasicIndoData] = useState<BasicInfoDto>({
    name: '',
      type: '',
      useOfProperty: '',
      sector: '',
      acronym: '',
      administration: ''
  })

  const [constructionData, setConstructionData] = useState<ConstructionDto>({
    stories: '',
      structure: '',
      slab: '',
      foundation: '',
      constructionSurface: '',
      surfaceArea: '',
      date: ''
  })
  const [locationData, setLocationData] = useState<LocationDto>({
    address: '',
      neighborhood: '',
      cp: '',
      state: '',
      stateCode: '',
      province: '',
      provinceCode: '',
      latitude: '',
      longitude: ''
  })

  const setDataInformation = async (id: string) => {
    const data = await PropertiesServices.getPropertyById(id)

    if (!data) return

    setHeaderData(data.general)
    setBasicIndoData(data.basicInfo)
    setConstructionData(data.constructionDetails)
    setLocationData(data.location)

    console.log(data.general)
  }

  useEffect(() => {

    if (router.query.idProperty) {
      setDataInformation(String(router.query.idProperty))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.idProperty]);

  return (
    <Container>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} >
            <PropertyHeader headerData={headerData}/>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <BasicInfo basicInfoData={basicInfoData} />
                  </Grid>
                  <Grid item xs={12}>
                    <ConstructionDetail constructionData={constructionData} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Location locationData={locationData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
    </Container>
  )
}

export default DynamicDataDashboard
