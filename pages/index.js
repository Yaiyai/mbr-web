import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout'

import Header from '../components/header/Header'
import { Historia } from '../components/historia/Historia'
import { getSections } from '../components/api/section'
import { Instalaciones } from '../components/instalaciones/Instalaciones'
import { Trabajos } from '../components/trabajos/Trabajos'
import { getCompany } from '../components/api/company'
import { Contacto } from '../components/contacto/Contacto'

const Home = ({ allSections }) => {
	const isMounted = useRef(true)
	const [sections] = useState(allSections)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<div>
			<BasicLayout location={'index'}>
				<Head>
					<title>Mecánica Brañosera || MBR </title>
				</Head>

				<Header sections={sections} />
				<a id='historia'></a>
				<Historia sections={sections} />

				<a id='instalaciones'></a>
				<Instalaciones sections={sections} />
				<a id='trabajos'></a>
				<Trabajos sections={sections} />
				<a id='contacto'></a>
				<Contacto sections={sections} />
			</BasicLayout>
		</div>
	)
}

export const getStaticProps = async () => {
	const companyFetched = await getCompany()
	const allSections = await getSections()

	return { props: { companyFetched, allSections } }
}

export default Home
