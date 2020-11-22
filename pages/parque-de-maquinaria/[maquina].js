import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BasicLayout from '../../layouts/BasicLayout'
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
						<title>Maquina {thisMaquina.name} || MBR</title>
					</Head>
					<h1>maquina seleccionada {thisMaquina.name}</h1>
				</BasicLayout>
			)}
		</>
	)
}

export default MaquinaSelected
