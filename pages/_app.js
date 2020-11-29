import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/global.scss'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
//Photoswipe
import 'react-photoswipe/lib/photoswipe.css'
import { CompanyContext } from '../context/companyContext'

const MyApp = ({ Component, pageProps }) => {
	const companyFetched = pageProps.companyFetched
	return (
		<CompanyContext.Provider value={{ companyFetched }}>
			<Component {...pageProps} />
		</CompanyContext.Provider>
	)
}

export default MyApp
