import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import BasicLayout from '../../layouts/BasicLayout'
import { getMaquinas } from '../../components/api/maquinas'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'
import { getCompany } from '../../components/api/company'
import { useContext } from 'react'
import { CompanyContextNew } from '../../context/CompanyContextNew'

const ParqueDeMaquinaria = ({ theMaquinas, thisSection }) => {
	const [allMaquinas] = useState(theMaquinas)
	const [section] = useState(thisSection)
	const { companyFetched } = useContext(CompanyContextNew)
	return (
		<>
			<BasicLayout location={'parque'}>
				<Head>
					<title>Parque de Maquinaria || MBR</title>
				</Head>
				<PageHeader title={section.title} bkg={section.uniqueImage} />
				<Container>
					{allMaquinas && (
						<section className='all-maquinas'>
							{companyFetched?.maquinasCategories.map((elm) => (
								<a key={elm}>{elm}</a>
							))}
							{allMaquinas.map((maq) => (
								<article key={maq._id} className='each-maquina'>
									<div className='inner'>
										<figure className='left'>
											<img src={maq.image} alt={maq.name} />
										</figure>
										<div className='right'>
											<p className='maquina-name'>{maq.name}</p>
											<Link href={`/parque-de-maquinaria/${maq._id}`}>
												<a className='my-btn secondary mini'>Ver máquina</a>
											</Link>
										</div>
									</div>
								</article>
							))}
						</section>
					)}
				</Container>
			</BasicLayout>
		</>
	)
}

export const getStaticProps = async () => {
	const companyFetched = await getCompany()
	const theMaquinas = await getMaquinas()
	const thisSection = await getThisSection('5fb15988fb855731d4d459df')
	return { props: { theMaquinas, thisSection, companyFetched } }
}

export default ParqueDeMaquinaria
