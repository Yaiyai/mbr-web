import React, { useContext } from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'
import NavBar from '../../components/nav/NavBar'
import { CompanyContext } from '../../context/companyContext'

const BasicLayout = (props) => {
	const theCompany = useContext(CompanyContext)
	const { children } = props

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar theCompany={theCompany} />
			<Container as='main'>{children}</Container>
		</>
	)
}

export default BasicLayout
