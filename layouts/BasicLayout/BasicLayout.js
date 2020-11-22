import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'
import NavBar from '../../ui/NavBar'

const BasicLayout = (props) => {
	const { children } = props

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<script src='https://kit.fontawesome.com/d78a3bc491.js' crossOrigin='anonymous'></script>
			</Head>

			<NavBar />
			<Container>{children}</Container>
		</>
	)
}

export default BasicLayout
