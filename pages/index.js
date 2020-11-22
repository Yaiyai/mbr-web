import Head from 'next/head'
import { useEffect, useReducer, useRef } from 'react'
import { CompanyContext } from '../context/companyContext'
import { MaquinasContext } from '../context/maquinasContext'
import BasicLayout from '../layouts/BasicLayout'
import CompanyReducer from '../reducers/CompanyReducer'
import MaquinasReducer from '../reducers/MaquinasReducer'

const Home = ({ theCompany, theMaquinas }) => {
	const isMounted = useRef(true)
	const [company] = useReducer(CompanyReducer, theCompany)
	const [maquinas] = useReducer(MaquinasReducer, theMaquinas)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<div>
			<CompanyContext.Provider value={company}>
				<Head>
					<title>Mecánica Brañosera</title>
				</Head>

				<MaquinasContext.Provider value={maquinas}>
					<BasicLayout>
						<h1>estamos en la home</h1>
					</BasicLayout>
				</MaquinasContext.Provider>
			</CompanyContext.Provider>
		</div>
	)
}

Home.getInitialProps = async () => {
	const theURL = process.env.baseURL
	const resCompany = await fetch(`${theURL}/company`)
	const bodyCompany = await resCompany.json()
	const resMaquinas = await fetch(`${theURL}/maquinaria`)
	const bodyMaquinas = await resMaquinas.json()

	return { theCompany: bodyCompany.company[0], theMaquinas: bodyMaquinas.data }
}

export default Home
