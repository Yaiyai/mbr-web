import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import BasicLayout from '../../layouts/BasicLayout'
import Container from 'react-bootstrap/Container'
import NavBar from '../../components/nav/NavBar'
import { getMaquinas, getMaquinasById } from '../../components/api/maquinas'

const MaquinaSelected = ({ theMaquina }) => {
	const isMounted = useRef(true)
	const [thisMaquina, setthisMaquina] = useState()

	useEffect(() => {
		if (isMounted.current) {
			setthisMaquina(theMaquina)
		}
		return () => {
			isMounted.current = false
		}
	}, [thisMaquina])

	return (
		<>
			{thisMaquina && (
				<BasicLayout>
					<Head>
						<title>MBR || {thisMaquina.name} </title>
					</Head>
					<NavBar clase={'nav-normal'} />

					<Container>
						<h1>maquina seleccionada {thisMaquina.name}</h1>
					</Container>
				</BasicLayout>
			)}
		</>
	)
}

export const getStaticPaths = async () => {
	const theMaquinas = await getMaquinas()
	return {
		paths: theMaquinas.map((maq) => {
			return {
				params: {
					maquina: maq._id,
				},
			}
		}),

		fallback: false,
	}
}

export const getStaticProps = async ({ params }) => {
	const { maquina } = params
	const theMaquina = await getMaquinasById(maquina)
	return { props: { theMaquina } }
}

export default MaquinaSelected
