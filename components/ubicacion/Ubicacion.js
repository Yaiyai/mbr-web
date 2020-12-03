import React, { useContext, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { CompanyContextNew } from '../../context/CompanyContextNew'

export const Ubicacion = ({ sections }) => {
	const isMounted = useRef(true)
	const [ubicacion, setUbicacion] = useState()
	const { companyFetched } = useContext(CompanyContextNew)

	useEffect(() => {
		const sectionID = '5fb1588bfb855731d4d459dd'
		setUbicacion(sections.find((elm) => elm._id === sectionID))
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<>
			{ubicacion && (
				<section className='ubicacion'>
					<div className='container'>
						<h2>{ubicacion.title}</h2>
						<article className='content'>
							<figure className='left'>
								<img src={ubicacion.uniqueImage} alt='' />
							</figure>
							<article className='right'>
								<article className='company-info'>
									<h3>{companyFetched.name}</h3>
									<h4>{companyFetched.address}</h4>
								</article>
								{ubicacion.parsedText ? <div dangerouslySetInnerHTML={ubicacion.parsedText}></div> : <p>{ubicacion.text}</p>}
							</article>
						</article>
					</div>
				</section>
			)}
		</>
	)
}
