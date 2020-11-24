import Head from 'next/head'
import { useEffect, useRef } from 'react'
import BasicLayout from '../layouts/BasicLayout'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Header from '../components/header/Header'
import NavBar from '../components/nav/NavBar'
library.add(fab)

const Home = ({}) => {
	const isMounted = useRef(true)

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

				<Header />
			</BasicLayout>
		</div>
	)
}

export default Home
