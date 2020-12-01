import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '../../layouts/BasicLayout'
import { faCheckCircle, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getMaquinas, getMaquinasById } from '../../components/api/maquinas'
import { PageHeader } from '../../components/page-header/PageHeader'
import Link from 'next/link'
import { getCompany } from '../../components/api/company'
import { PhotoSwipeGallery } from 'react-photoswipe'

const MaquinaSelected = ({ theMaquina }) => {
	const isMounted = useRef(true)
	const [thisMaquina] = useState(theMaquina)
	const [items, setItems] = useState()

	useEffect(() => {
		if (isMounted.current) {
			if (thisMaquina) {
				setItems(
					thisMaquina.gallery.map((elm) => {
						return {
							src: elm,
							thumbnail: getThumbnails(elm),
							w: 1200,
							h: 900,
						}
					})
				)
			}
		}
		return () => {
			isMounted.current = false
		}
	}, [thisMaquina, items])

	const getThumbnails = (str) => {
		let splitStr = str.split('upload/')
		let newStr = 'upload/w_200/'
		return `${splitStr[0]}${newStr}${splitStr[1]}`
	}

	const getThumbnailContent = (item) => {
		return <img src={item.thumbnail} />
	}

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
					{thisMaquina.gallery.length > 0 && (
						<section className='maquina-gallery container'>
							<h2>Trabajos de esta máquina</h2>
							{items && <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent} />}
						</section>
					)}
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
