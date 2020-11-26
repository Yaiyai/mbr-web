import Head from 'next/head'
import { useEffect, useRef } from 'react'
import BasicLayout from '../layouts/BasicLayout'

import Header from '../components/header/Header'
import NavBar from '../components/nav/NavBar'

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
