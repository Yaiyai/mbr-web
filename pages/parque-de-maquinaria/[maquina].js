import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '../../layouts/BasicLayout'
import { faCheckCircle, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PageHeader } from '../../components/page-header/PageHeader'
import Link from 'next/link'
import { getCompany } from '../../components/api/company'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { useRouter } from 'next/router'

const apiURL = process.env.baseURL

const MaquinaSelected = () => {
	const router = useRouter()
	const maquinaId = router.query.maquina
	const isMounted = useRef(true)
	const [thisMaquina, setMaquina] = useState()
	const [items, setItems] = useState()

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [items])

	useEffect(() => {
		if (isMounted.current) {
			fetch(`${apiURL}/maquinaria/${maquinaId}`)
				.then((data) => data.json())
				.then((data) => setMaquina(data.data))
				.catch((err) => console.log(err))

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
	}, [maquinaId, thisMaquina, items])

	const getThumbnails = (str) => {
		if (str.includes('mp4')) {
			let splitFormat = str.split('mp4')
			let splitStr = splitFormat[0].split('upload/')
			let newStr = 'upload/w_200/'
			return `${splitStr[0]}${newStr}${splitStr[1]}jpg`
		} else if (str.includes('mov')) {
			let splitFormat = str.split('mov')
			let splitStr = splitFormat[0].split('upload/')
			let newStr = 'upload/w_200/'
			return `${splitStr[0]}${newStr}${splitStr[1]}jpg`
		} else {
			let splitStr = str.split('upload/')
			let newStr = 'upload/w_200/'
			return `${splitStr[0]}${newStr}${splitStr[1]}`
		}
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
								<li>
									<FontAwesomeIcon icon={faCheckCircle} />
									Categoría: {thisMaquina.category}
								</li>
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

					{thisMaquina?.gallery.length > 0 && (
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
export const getServerSideProps = async () => {
	const companyFetched = await getCompany()

	return { props: { companyFetched } }
}

export default MaquinaSelected
