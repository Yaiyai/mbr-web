import React from 'react'
import { getCompany } from '../../components/api/company'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'
import BasicLayout from '../../layouts/BasicLayout'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Certificaciones from '../../components/certificaciones/Certificaciones'
import { Content } from '../../components/certificaciones/content/Content'

const Calidad = ({ thisSection, certificaciones }) => {
	const isMounted = useRef(true)
	const [items, setItems] = useState()
	const [videos, setvideos] = useState()
	const [show, setShow] = useState(false)
	const [videoID, setVideoID] = useState()
	const [introduccion, setIntroduccion] = useState()
	const [medicion, setMedicion] = useState()
	const [software, setSoftware] = useState()
	const [marcadora, setMarcadora] = useState()

	useEffect(() => {
		if (isMounted.current) {
			if (thisSection) {
				const clean = thisSection.gallery.filter((elm) => elm.includes('jpg') || elm.includes('png'))
				const cleanVideos = thisSection.gallery.filter((elm) => elm.includes('mp4') || elm.includes('mov'))
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
				const getItroduccion = thisSection.text.split('((INTRODUCCION))')
				const getMedicion = getItroduccion[1].split('((MEDICION))')
				const getSoftware = getMedicion[1].split('((SOFTWARE))')
				setIntroduccion({ __html: getItroduccion[0] })
				setMedicion({ __html: getMedicion[0] })
				setSoftware({ __html: getSoftware[0] })
				setMarcadora({ __html: getSoftware[1] })
			}
		}
	}, [thisSection, items, medicion, software, marcadora, introduccion])

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [items])

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
		<BasicLayout location={'parque'}>
			<Head>
				<meta name='robots' content='index, follow' />
				<meta name='googlebot' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
				<meta name='bingbot' content='index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' />
				<meta name='twitter:title' content='Calidad y certificaciones || MBR' />
				<meta property='og:title' content='Calidad y certificaciones || MBR' />
				<title>Calidad y certificaciones || MBR</title>
			</Head>

			<PageHeader title={thisSection.title} subtitle={thisSection.subtitle} />
			<section className='calidad container'>
				{(introduccion || medicion || software || marcadora) && <Content introduccion={introduccion} medicion={medicion} software={software} marcadora={marcadora} />}

				{thisSection && (
					<article className='trabajos'>
						<h3>Trabajos</h3>
						{items && <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent} />}
						{videos?.length > 0 && (
							<div>
								<h3>Vídeos</h3>
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
							{showThisVideo()}
						</Modal>
					</article>
				)}
				<a id='certificaciones'></a>
				<Certificaciones certificaciones={certificaciones} />
			</section>
		</BasicLayout>
	)
}
export const getServerSideProps = async () => {
	const companyFetched = await getCompany()
	const thisSection = await getThisSection('5fd79f29b42da300176dc598')
	const certificaciones = await getThisSection('5fd79c60b42da300176dc597')
	return { props: { thisSection, companyFetched, certificaciones } }
}

export default Calidad
