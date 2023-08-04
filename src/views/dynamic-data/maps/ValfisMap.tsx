import { useEffect, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

const ValfisMap = () => {

  const mapSrc = "/images/pages/properties-map.png"
  const zoneData = {
    totalValue: '19833668',
    zoneA: '$5M - $13M',
    zoneB: '$13M - $50M',
    zoneC: '$50M - '
  }

  const detailsData = {
    totalValue: '19833668',
    state: 'Yucatán',
    numberAssets: '236,000',
    crestaZone: '1'
  }
  const [showDetails, setShowDetails] = useState(false)
  const [showZoneDescription, setShowZoneDescription] = useState(false)

  useEffect(() => {
    setShowDetails(true)
    setShowZoneDescription(true)
  }, [])

  return (

    <Grid container spacing={6} className='match-height'>
      {showZoneDescription &&
        <Grid item xs={12}>
          <Card>
            <div className='map-details-wrapper'>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'primary'}>
                  <Icon icon='mdi:currency-usd' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    TOTAL REPL. VALUE SUM
                  </div>
                  <div className='details-row'>
                    ${zoneData.totalValue}MXN
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'success'}>
                  <Icon icon='mdi:circle' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    ZONE A
                  </div>
                  <div className='details-row' style={{ color: '#2535A8' }}>
                    {zoneData.zoneA}
                  </div>
                </div>
              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'warning'}>
                  <Icon icon='mdi:circle' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    ZONE B
                  </div>
                  <div className='details-row'>
                    {zoneData.zoneB}
                  </div>
                </div>

              </div>
              <div className="vertical-divider"></div>
              <div className='details-col'>
                <CustomAvatar skin='light' variant='rounded' color={'error'}>
                  <Icon icon='mdi:circle' />
                </CustomAvatar>
                <div>
                  <div className='details-row title'>
                    ZONE C
                  </div>
                  <div className='details-row'>
                    {zoneData.zoneC}
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </Grid>
      }

      {showDetails && <Grid item xs={12}>
        <Card>
          <div className='map-details-wrapper'>
            <div className='details-col' style={{ gap: '10px' }}>
              <CustomAvatar skin='light' variant='rounded' color={'primary'}>
                <Icon icon='mdi:currency-usd' />
              </CustomAvatar>
              <div>
                <div className='details-row title'>
                  TOTAL STATE REPL. VALUE
                </div>
                <div className='details-row'>
                  ${detailsData.totalValue}MXN
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
                  NUMBER OF ASSETS
                </div>
                <div className='details-row'>
                  {detailsData.numberAssets}
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
                  {detailsData.crestaZone}
                </div>
              </div>

            </div>
          </div>
        </Card>
      </Grid>}


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

export default ValfisMap
