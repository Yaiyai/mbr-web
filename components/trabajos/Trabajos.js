import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

import { PhotoSwipeGallery } from 'react-photoswipe'

export const Trabajos = ({ sections }) => {
	const isMounted = useRef(true)
	const [trabajos, setTrabajos] = useState()
	const [items, setItems] = useState()
	const [videos, setvideos] = useState()
	const [show, setShow] = useState(false)
	const [videoID, setVideoID] = useState()

	useEffect(() => {
		const sectionID = '5fb157fefb855731d4d459dc'
		if (isMounted.current) {
			setTrabajos(sections.find((elm) => elm._id === sectionID))
		}
	}, [trabajos])

	useEffect(() => {
		if (isMounted.current) {
			if (trabajos) {
				const clean = trabajos.gallery.filter((elm) => elm.includes('jpg') || elm.includes('png'))
				const cleanVideos = trabajos.gallery.filter((elm) => elm.includes('mp4') || elm.includes('mov'))
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
	}, [trabajos, items])

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
		<>
			{trabajos && trabajos.gallery.length !== 0 && (
				<section className='trabajos'>
					<div className='container'>
						<h2>{trabajos.title}</h2>
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
					</div>
				</section>
			)}
		</>
	)
}
