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

const Calidad = ({ thisSection }) => {
	const isMounted = useRef(true)
	const [items, setItems] = useState()
	const [videos, setvideos] = useState()
	const [show, setShow] = useState(false)
	const [videoID, setVideoID] = useState()

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
			}
		}
	}, [thisSection, items])

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
			<PageHeader title={thisSection.title} subtitle={thisSection.subtitle} />
			<section className='calidad container'>
				{thisSection.parsedText ? <div className='text-editor' dangerouslySetInnerHTML={thisSection.parsedText}></div> : <p>{thisSection.text}</p>}
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
				<div className='certificacion'>
					<h2>Certificación</h2>
					<figure className='each-cert'>
						<img src={thisSection.uniqueImage} alt='' />
					</figure>
				</div>
			</section>
		</BasicLayout>
	)
}
export const getServerSideProps = async () => {
	const companyFetched = await getCompany()
	const thisSection = await getThisSection('5fcf671d04dc5000172a58e5')
	return { props: { thisSection, companyFetched } }
}

export default Calidad
