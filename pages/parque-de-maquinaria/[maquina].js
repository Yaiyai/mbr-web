import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const MaquinaSelected = () => {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>Maquina {router.query.maquina} || MBR</title>
			</Head>
			<h1>maquina seleccionada {router.query.maquina}</h1>
		</>
	)
}

export default MaquinaSelected
