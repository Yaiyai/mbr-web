import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import BasicLayout from '../../layouts/BasicLayout'
import NavBar from '../../components/nav/NavBar'
import { getMaquinas } from '../../components/api/maquinas'

const ParqueDeMaquinaria = ({ theMaquinas }) => {
	const [allMaquinas, setAllMaquinas] = useState(theMaquinas)
	return (
		<>
			<BasicLayout>
				<Head>
					<title>Parque de Maquinaria || MBR</title>
				</Head>
				<NavBar clase={'nav-normal'} />

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
	return { props: { theMaquinas } }
}

export default ParqueDeMaquinaria
