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
				<script src='https://cmp.osano.com/6oljJSIUNV9r1ZFS/3dbe5f87-28e9-45af-92b7-6da4839bd0e2/osano.js'></script>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{location == 'index' ? <NavBar company={companyFetched} clase={'nav-index'} /> : <NavBar company={companyFetched} clase={'nav-normal'} />}
			<main>{children}</main>
			<Footer company={companyFetched} />
		</>
	)
}

export default BasicLayout
