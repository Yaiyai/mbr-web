import React, { useContext } from 'react'
import Head from 'next/head'
import NavBar from '../../components/nav/NavBar'
import { CompanyContext } from '../../context/companyContext'
import { MaquinasContext } from '../../context/maquinasContext'
import Container from 'react-bootstrap/Container'
import Footer from '../../components/footer/Footer'

const BasicLayout = (props) => {
	const theCompany = useContext(CompanyContext)
	const theMaquinas = useContext(MaquinasContext)
	const { children } = props

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<NavBar theCompany={theCompany} theMaquinas={theMaquinas} />
			<Container as='main'>{children}</Container>
			<Footer theCompany={theCompany} />
		</>
	)
}

export default BasicLayout
