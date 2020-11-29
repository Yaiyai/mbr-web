import React, { useContext } from 'react'
import Head from 'next/head'
import Footer from '../../components/footer/Footer'
import NavBar from '../../components/nav/NavBar'
import { CompanyContextNew } from '../../context/CompanyContextNew'

const BasicLayout = (props) => {
	const { children, location } = props
	const { companyFetched } = useContext(CompanyContextNew)

	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{location == 'index' ? <NavBar company={companyFetched} clase={'nav-index'} /> : <NavBar company={companyFetched} clase={'nav-normal'} />}
			<main>{children}</main>
			<Footer company={companyFetched} />
		</>
	)
}

export default BasicLayout
