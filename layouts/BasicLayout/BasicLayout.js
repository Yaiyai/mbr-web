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
				<meta name='description' content='Mecanizado de precisión CAD CAM CNC' />
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
				<meta name='bingbot' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
				<meta
					name='keywords'
					content='MECANIZADO, HERMLE, FOX, REINOSA, REQUEJO, BRAÑOSERA, FRESA, FRESADO, TORNO, TORNEADO, CNC, CAD, CAM, CANTABRIA, MECANIZADO CANTABRIA, FRESADO CANTABRIA, FRESADO PALENCIA, MECANIZADO PALENCIA, HERMLE CANTABRIA, HERMLE PALENCIA'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Mecánica Brañosera || MBR' />
				<meta property='og:image' content='https://res.cloudinary.com/mbr-app/image/upload/v1608467790/og_image_opt_alxcmd.jpg' />
				<meta property='og:image:secure_url' content='https://res.cloudinary.com/mbr-app/image/upload/v1608467790/og_image_opt_alxcmd.jpg' />
				<meta property='og:image:type' content='image/jpeg' />
				<meta property='og:description' content='Mecanizado de precisión CAD CAM CNC' />
				<meta property='og:url' content='https://mecanicabranosera.es/' />
				<meta property='og:site_name' content='Mecánica Brañosera' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:url' content='https://mecanicabranosera.es/' />
				<meta name='twitter:title' content='Mecánica Brañosera || MBR' />
				<meta name='twitter:description' content='Mecanizado de precisión CAD CAM CNC' />

				<script src='https://cmp.osano.com/6oljJSIUNV9r1ZFS/3dbe5f87-28e9-45af-92b7-6da4839bd0e2/osano.js'></script>
				<title>Mecánica Brañosera || MBR</title>
			</Head>
			{location == 'index' ? <NavBar company={companyFetched} clase={'nav-index'} /> : <NavBar company={companyFetched} clase={'nav-normal'} />}
			<main>{children}</main>
			<Footer company={companyFetched} />
		</>
	)
}

export default BasicLayout
