import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { PhotoSwipeGallery } from 'react-photoswipe'

export const Trabajos = ({ sections }) => {
	const isMounted = useRef(true)
	const [trabajos, setTrabajos] = useState()
	const [items, setItems] = useState()
	useEffect(() => {
		const sectionID = '5fb157fefb855731d4d459dc'
		if (isMounted.current) {
			setTrabajos(sections.find((elm) => elm._id === sectionID))
		}
	}, [trabajos])

	useEffect(() => {
		if (isMounted.current) {
			if (trabajos) {
				setItems(
					trabajos.gallery.map((elm) => {
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
	}, [trabajos, items])

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [items])

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
			{trabajos && (
				<section id='trabajos' className='trabajos'>
					<div className='container'>
						<h2>{trabajos.title}</h2>
						{items && <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent} />}
					</div>
				</section>
			)}
		</>
	)
}
