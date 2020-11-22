import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MaquinasContext } from '../context/maquinasContext'
import BasicLayout from '../layouts/BasicLayout'

const ParqueDeMaquinaria = () => {
	const allMaquinas = useContext(MaquinasContext)
	return (
		<>
			<BasicLayout>
				<Head>
					<title>Parque de Maquinaria || MBR</title>
				</Head>
				<h1>parque</h1>
				{allMaquinas &&
					allMaquinas.map((maq) => (
						<Link key={maq._id} href={`/parque-de-maquinaria/${maq.name}`}>
							<button>{maq.name}</button>
						</Link>
					))}
			</BasicLayout>
		</>
	)
}

export default ParqueDeMaquinaria
