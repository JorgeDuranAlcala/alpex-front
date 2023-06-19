import ReactGA from 'react-ga4'

const id = process.env.NEXT_PUBLIC_ALPEX_ID_GOOGLE_ANALYTICS
if (!id) throw new Error('Google analytics ID was not found in the app')

ReactGA.initialize(id)

export default ReactGA
