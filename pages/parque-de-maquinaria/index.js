import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import BasicLayout from '../../layouts/BasicLayout'
import NavBar from '../../components/nav/NavBar'
import { getMaquinas } from '../../components/api/maquinas'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'

const ParqueDeMaquinaria = ({ theMaquinas, thisSection }) => {
	const [allMaquinas] = useState(theMaquinas)
	const [section] = useState(thisSection)
	return (
		<>
			<BasicLayout>
				<Head>
					<title>Parque de Maquinaria || MBR</title>
				</Head>
				<NavBar clase={'nav-normal'} />
				<PageHeader title={section.title} bkg={section.uniqueImage} />
				<Container>
					{allMaquinas && (
						<section className='all-maquinas'>
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
	const theMaquinas = await getMaquinas()
	const thisSection = await getThisSection('5fb15988fb855731d4d459df')
	return { props: { theMaquinas, thisSection } }
}

export default ParqueDeMaquinaria
