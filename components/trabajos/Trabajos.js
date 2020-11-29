import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { PhotoSwipeGallery } from 'react-photoswipe'

export const Trabajos = ({ sections }) => {
	const isMounted = useRef(true)
	const [allSections] = useState(sections)
	const [trabajos, setTrabajos] = useState()
	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	})
	useEffect(() => {
		const sectionID = '5fb157fefb855731d4d459dc'
		if (isMounted.current) {
			setTrabajos(allSections.find((elm) => elm._id === sectionID))
		}
	}, [])

	const getThumbnails = (str) => {
		let splitStr = str.split('upload/')
		let newStr = 'upload/w_200/'
		return `${splitStr[0]}${newStr}${splitStr[1]}`
	}

	if (trabajos) {
		const items = trabajos.gallery.map((elm) => {
			return {
				src: elm,
				thumbnail: getThumbnails(elm),
				w: 1200,
				h: 900,
			}
		})
		// console.log(items)
	}
	const getThumbnailContent = (item) => {
		return <img src={item.thumbnail} width={120} height={90} />
	}

	return (
		<>
			{trabajos && (
				<section id='trabajos' className='trabajos'>
					<div className='container'>
						<h2>{trabajos.title}</h2>
						{/* <PhotoSwipeGallery items={items} thumbnailContent={getThumbnailContent} /> */}
					</div>
				</section>
			)}
		</>
	)
}
