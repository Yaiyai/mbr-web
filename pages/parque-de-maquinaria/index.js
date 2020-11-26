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
					<h1>parque</h1>
					{allMaquinas &&
						allMaquinas.map((maq) => (
							<Link key={maq._id} href={`/parque-de-maquinaria/${maq._id}`}>
								<button>{maq.name}</button>
							</Link>
						))}
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
