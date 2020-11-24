import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BasicLayout from '../../layouts/BasicLayout'
import Container from 'react-bootstrap/Container'
import { MaquinasContext } from '../../context/maquinasContext'

const MaquinaSelected = () => {
	const allMaquinas = useContext(MaquinasContext)
	const [thisMaquina, setthisMaquina] = useState()
	const router = useRouter()
	const { maquina } = router.query

	useEffect(() => {
		setthisMaquina(allMaquinas.find((maq) => maq.name === maquina))
	}, [])

	return (
		<>
			{thisMaquina && (
				<BasicLayout>
					<Head>
						<title>MBR || {thisMaquina.name} </title>
					</Head>
					<Container>
						<h1>maquina seleccionada {thisMaquina.name}</h1>
					</Container>
				</BasicLayout>
			)}
		</>
	)
}

export default MaquinaSelected
