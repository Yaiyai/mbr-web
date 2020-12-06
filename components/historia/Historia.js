import React, { useEffect, useRef, useState } from 'react'

import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
SwiperCore.use([Autoplay, Pagination])

export const Historia = ({ sections }) => {
	const [historia, setHistoria] = useState()

	const isMounted = useRef(true)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		const sectionID = '5fb156befb855731d4d459da'
		if (isMounted.current) {
			setHistoria(sections?.find((elm) => elm._id === sectionID))
		}
	}, [historia])

	return (
		<>
			{historia && (
				<section id='historia' className='historia'>
					<div className='container'>
						<div className='left'>
							<Swiper
								spaceBetween={0}
								autoplay={{
									delay: 2500,
								}}
								slidesPerView={1}
								pagination={{ clickable: true }}>
								{historia.gallery?.map((elm, idx) => (
									<SwiperSlide key={idx}>
										<img src={elm} alt='' />
									</SwiperSlide>
								))}
							</Swiper>
						</div>
						<div className='right'>
							<p className='subtitle'>{historia.subtitle}</p>
							<h2>{historia.title}</h2>
							{historia.parsedText ? <div className='text-editor' dangerouslySetInnerHTML={historia.parsedText}></div> : <p>{historia.text}</p>}
						</div>
					</div>
				</section>
			)}
		</>
	)
}
