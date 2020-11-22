import 'semantic-ui-css/semantic.min.css'
import '../scss/global.scss'
import CompanyReducer from '../reducers/CompanyReducer'
import MaquinasReducer from '../reducers/MaquinasReducer'
import { useReducer } from 'react'
import { CompanyContext } from '../context/companyContext'
import { MaquinasContext } from '../context/maquinasContext'

const MyApp = ({ Component, pageProps, theCompany, theMaquinas }) => {
	const [company] = useReducer(CompanyReducer, theCompany)
	const [maquinas] = useReducer(MaquinasReducer, theMaquinas)

	return (
		<CompanyContext.Provider value={company}>
			<MaquinasContext.Provider value={maquinas}>
				<Component {...pageProps} />
			</MaquinasContext.Provider>
		</CompanyContext.Provider>
	)
}

MyApp.getInitialProps = async () => {
	const theURL = process.env.baseURL
	const resCompany = await fetch(`${theURL}/company`)
	const bodyCompany = await resCompany.json()
	const resMaquinas = await fetch(`${theURL}/maquinaria`)
	const bodyMaquinas = await resMaquinas.json()

	return { theCompany: bodyCompany.company[0], theMaquinas: bodyMaquinas.data }
}

export default MyApp
