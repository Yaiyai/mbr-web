import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'

const Header = ({ sections }) => {
	const [allSections] = useState(sections)
	const [header, setHeader] = useState()
	const isMounted = useRef(true)

	const headerBKG = 'https://res.cloudinary.com/mbr-app/image/upload/v1606160975/header_wvjrzj.jpg'

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		const sectionID = '5fb107a0a89ab807f04df010'
		if (isMounted.current) {
			setHeader(allSections?.find((elm) => elm._id === sectionID))
		}
	}, [])

	return (
		<>
			{header && (
				<header style={{ backgroundImage: `url(${headerBKG})` }}>
					<Container>
						<article className='img-content'>
							<figure>
								<img src={header.uniqueImage} alt='' />
							</figure>
						</article>
						<div className='right-side'>
							<article className='text-content'>
								<h1>{header.title}</h1>
								<h2>{header.subtitle}</h2>
							</article>
						</div>
					</Container>
					<article className='special-buttons'>
						<Link href='/#instalaciones'>
							<a id='instalaciones-btn'>Instalaciones</a>
						</Link>
						<Link href='/parque-de-maquinaria'>
							<a id='maquinaria-btn'>Maquinaria</a>
						</Link>
					</article>
				</header>
			)}
		</>
	)
}

export default Header
