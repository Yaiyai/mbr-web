import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '../../layouts/BasicLayout'
import { faCheckCircle, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getMaquinas, getMaquinasById } from '../../components/api/maquinas'
import { PageHeader } from '../../components/page-header/PageHeader'
import Link from 'next/link'
import { getCompany } from '../../components/api/company'

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
				<BasicLayout location={'parque'}>
					<Head>
						<title>MBR || {thisMaquina.name} </title>
					</Head>
					<PageHeader title={thisMaquina.name} />

					<section className='maquina-selected container'>
						<div className='left'>
							<Link href='/parque-de-maquinaria'>
								<a className='my-btn-back'>
									{' '}
									<FontAwesomeIcon icon={faAngleDoubleLeft} /> Volver
								</a>
							</Link>
							<figure>
								<img src={thisMaquina.image} alt={thisMaquina.name} />
							</figure>
						</div>
						<div className='right'>
							<ul className='features'>
								{thisMaquina.features.map((ft, idx) => (
									<li key={idx}>
										{' '}
										<FontAwesomeIcon icon={faCheckCircle} />
										{ft}{' '}
									</li>
								))}
							</ul>
						</div>
					</section>
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
	const companyFetched = await getCompany()
	const theMaquina = await getMaquinasById(maquina)
	return { props: { theMaquina, companyFetched } }
}

export default MaquinaSelected
