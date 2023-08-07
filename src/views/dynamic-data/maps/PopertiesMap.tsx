import { useEffect, useState } from 'react';

// ** MUI Imports
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const PropertiesMap = () => {

  const mapSrc = "/images/pages/properties-map.png"
  const detailsData = {
    replacementValue: '19833668',
    assetId: '#06003_2',
    state: 'Ciudad de México',
    province: 'Benito Juárez',
    crestazone: '1'
  }
  const [showDetails, setShowDetails] = useState(false)


  const seeMore = () => {
    console.log("see more")

    // router.push(`/dynamic-data/property-listing/`)
  }

  useEffect(() => {
    setShowDetails(true)
  }, [])

  return (

    <Grid container spacing={6} className='match-height'>
      <Grid item xs={12}>
        {showDetails &&
          <Card>
            <div className='map-details-wrapper'>
              <div className='details-col' style={{ gap: '10px' }}>
                <CustomAvatar skin='light' variant='rounded' color={'primary'}>
                  <Icon icon='mdi:currency-usd' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    REPLACEMENT VALUE
                  </div>
                  <div className='details-row'>
                    ${detailsData.replacementValue}MXN
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <div>
                  <div className='details-row title'>
                    ASSET ID
                  </div>
                  <div className='details-row' style={{ color: '#2535A8' }}>
                    {detailsData.assetId}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <div>
                  <div className='details-row title'>
                    STATE
                  </div>
                  <div className='details-row'>
                    {detailsData.state}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <div>
                  <div className='details-row title'>
                    PROVINCE
                  </div>
                  <div className='details-row'>
                    {detailsData.province}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <div>
                  <div className='details-row title'>
                    CRESTA ZONE
                  </div>
                  <div className='details-row'>
                    {detailsData.crestazone}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col' style={{justifyContent: 'center'}}>
                <Button className='add-btn' onClick={seeMore}>
                  See more
                </Button>
              </div>

            </div>
          </Card>
        }

      </Grid>
      <Grid item xs={12}>
        <Card>
          <img
            src={mapSrc}
            alt="properties map"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

        </Card>
      </Grid>
    </Grid>
  )
}

export default PropertiesMap
