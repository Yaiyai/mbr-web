import React, { useEffect, useState, useRef } from 'react'

import SwiperCore, { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
SwiperCore.use([Autoplay, Pagination])

import { faCheckCircle, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Instalaciones = ({ sections }) => {
	const isMounted = useRef(true)
	const [allSections] = useState(sections)
	const [instalaciones, setInstalaciones] = useState()

	if (instalaciones) {
		const featuresRequejo = instalaciones.features.slice(0, 2)
	}

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		const sectionID = '5fb15764fb855731d4d459db'
		if (isMounted.current) {
			setInstalaciones(allSections.find((elm) => elm._id === sectionID))
		}
	}, [instalaciones])

	return (
		<>
			{instalaciones && (
				<section id='instalaciones' className='instalaciones'>
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
						<div className='left'>
							<div className='title'>Planta de Requejo</div>
							{instalaciones.features && (
								<ul>
									{instalaciones.features.slice(0, 2).map((elm, idx) => (
										<li key={idx}>
											<FontAwesomeIcon icon={faCheckCircle} />
											{elm}
										</li>
									))}
								</ul>
							)}
						</div>
						<div className='right'>
							<div className='title'>Planta de Reinosa</div>
							{instalaciones.features && (
								<ul>
									<li>
										<FontAwesomeIcon icon={faCheckCircle} />
										{instalaciones.features[instalaciones.features.length - 1]}
									</li>
								</ul>
							)}
						</div>
					</article>
				</section>
			)}
		</>
	)
}
