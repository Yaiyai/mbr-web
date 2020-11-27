import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { PhotoSwipe } from 'react-photoswipe'

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
	}, [trabajos])
	return (
		<>
			{trabajos && (
				<section id='trabajos' className='trabajos'>
					<div className='container'>
						<h2>{trabajos.title}</h2>
					</div>
				</section>
			)}
		</>
	)
}
