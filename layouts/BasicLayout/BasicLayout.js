import React from 'react'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'

const BasicLayout = (props) => {
	const { children } = props

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>{children}</main>
			<Footer />
		</>
	)
}

export default BasicLayout
