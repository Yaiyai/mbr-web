import React, { useEffect, useState, useRef } from 'react'

import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
SwiperCore.use([Autoplay, Pagination])

export const Instalaciones = ({ sections }) => {
	const isMounted = useRef(true)
	const [instalaciones, setInstalaciones] = useState()
	const [requejo, setRequejo] = useState()
	const [reinosa, setReinosa] = useState()

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		const sectionID = '5fccc5bb3ee3730017c3be7f'
		if (isMounted.current) {
			setInstalaciones(sections.find((elm) => elm._id === sectionID))
			if (instalaciones) {
				const allText = instalaciones.text.split('(CORTAR)')
				const featuresRequejo = allText[0]
				const featuresReinosa = allText[1]
				setRequejo({ __html: featuresRequejo })
				setReinosa({ __html: featuresReinosa })
			}
		}
	}, [instalaciones])

	return (
		<>
			{instalaciones && (
				<div>
					<section className='instalaciones'>
						<article className='container'>
							<h2>{instalaciones.title}</h2>
						</article>
						<Swiper
							spaceBetween={0}
							autoplay={{
								delay: 2500,
							}}
							slidesPerView={1}
							pagination={{ clickable: true }}>
							{instalaciones.gallery?.map((elm, idx) => (
								<SwiperSlide key={idx}>
									<img src={elm} alt='' />
								</SwiperSlide>
							))}
						</Swiper>
						<article className='container plantas'>
							{requejo && <div className='left text-editor' dangerouslySetInnerHTML={requejo}></div>}
							{reinosa && <div className='right text-editor' dangerouslySetInnerHTML={reinosa}></div>}
						</article>
					</section>
				</div>
			)}
		</>
	)
}
