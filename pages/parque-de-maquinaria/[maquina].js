import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BasicLayout from '../../layouts/BasicLayout'

const MaquinaSelected = () => {
	const router = useRouter()

	return (
		<>
			<BasicLayout>
				<Head>
					<title>Maquina {router.query.maquina} || MBR</title>
				</Head>
				<h1>maquina seleccionada {router.query.maquina}</h1>
			</BasicLayout>
		</>
	)
}

export default MaquinaSelected
