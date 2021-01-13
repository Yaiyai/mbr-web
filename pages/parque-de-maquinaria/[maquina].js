import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import BasicLayout from '../../layouts/BasicLayout'
import { faCheckCircle, faAngleDoubleLeft, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PageHeader } from '../../components/page-header/PageHeader'
import Link from 'next/link'
import { getCompany } from '../../components/api/company'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'

const apiURL = process.env.baseURL

const MaquinaSelected = () => {
	const router = useRouter()
	const maquinaId = router.query.maquina
	const isMounted = useRef(true)
	const [thisMaquina, setMaquina] = useState()
	const [items, setItems] = useState()
	const [videos, setvideos] = useState()
	const [show, setShow] = useState(false)
	const [videoID, setVideoID] = useState()

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [items, videos])

	useEffect(() => {
		if (isMounted.current) {
			fetch(`${apiURL}/maquinaria/${maquinaId}`)
				.then((data) => data.json())
				.then((data) => setMaquina(data.data))
				.catch((err) => console.log(err))

			if (thisMaquina) {
				const clean = thisMaquina.gallery.filter((elm) => elm.includes('jpg') || elm.includes('png'))
				const cleanVideos = thisMaquina.gallery.filter((elm) => elm.includes('mp4') || elm.includes('mov'))
				setItems(
					clean.map((elm) => {
						return {
							src: elm,
							thumbnail: getThumbnails(elm),
							w: 1200,
							h: 900,
						}
					})
				)
				setvideos(
					cleanVideos.map((elm, idx) => {
						return {
							src: elm,
							thumbnail: getThumbnails(elm),
							id: `video${idx}`,
						}
					})
				)
			}
		}
	}, [maquinaId, thisMaquina, items, videos])

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
		if (item.src) {
			return <img src={item.thumbnail} />
		}
	}

	const handleModal = (video) => {
		setVideoID(video)
		setShow(true)
	}

	const showThisVideo = () => {
		return <video className='each-video' src={videoID} controls muted />
	}

	return (
		<>
			{thisMaquina && (
				<BasicLayout location={'parque'}>
					<Head>
						<meta name='description' content={thisMaquina.name} />
						<meta property='og:description' content={thisMaquina.name} />
						<meta name='twitter:description' content={`${thisMaquina.name}`} />
						<meta name='robots' content='index, follow' />
						<meta name='googlebot' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
						<meta name='bingbot' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
						<meta name='twitter:title' content={`${thisMaquina.name} || MBR`} />
						<meta property='og:title' content={`${thisMaquina.name} || MBR`} />
						<title>{thisMaquina.name} || MBR</title>
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
							<h2>Fotos</h2>
							{items && <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent} />}
							{videos?.length > 0 && (
								<div>
									<h2>Vídeos</h2>
									<article className='media-section'>
										{videos.map((elm) => (
											<a key={elm.id} onClick={() => handleModal(elm.src)} className='each-media'>
												<img src={elm.thumbnail} alt='' />
											</a>
										))}
									</article>
								</div>
							)}
							<Modal centered className='my-modals video' show={show} onHide={() => setShow(false)}>
								<button className='close-btn' onClick={() => setShow(false)}>
									Cerrar
									<FontAwesomeIcon icon={faTimesCircle} />
								</button>
								{showThisVideo()}
							</Modal>
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
