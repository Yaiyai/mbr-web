import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import BasicLayout from '../layouts/BasicLayout'

import Header from '../components/header/Header'
import NavBar from '../components/nav/NavBar'
import { Historia } from '../components/historia/Historia'
import { getSections } from '../components/api/section'
import { Instalaciones } from '../components/instalaciones/Instalaciones'

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
			<BasicLayout>
				<Head>
					<title>Mecánica Brañosera || MBR </title>
				</Head>
				<NavBar clase={'nav-index'} />

				<Header sections={sections} />
				<Historia sections={sections} />
				<Instalaciones sections={sections} />
			</BasicLayout>
		</div>
	)
}

export const getStaticProps = async () => {
	const allSections = await getSections()
	return { props: { allSections } }
}

export default Home
