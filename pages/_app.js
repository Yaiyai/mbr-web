import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/global.scss'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'

const MyApp = ({ Component, pageProps }) => {
	return <Component {...pageProps} />
}

export default MyApp
