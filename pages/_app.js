import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/global.scss'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
//Photoswipe
import 'react-photoswipe/lib/photoswipe.css'
import { CompanyContextNew } from '../context/CompanyContextNew'

const MyApp = ({ Component, pageProps }) => {
	const companyFetched = pageProps.companyFetched
	return (
		<CompanyContextNew.Provider value={{ companyFetched }}>
			<Component {...pageProps} />
		</CompanyContextNew.Provider>
	)
}

export default MyApp
