import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'

const Header = () => {
	const [header, setHeader] = useState()
	const isMounted = useRef(true)
	const headerBKG = 'https://res.cloudinary.com/mbr-app/image/upload/v1606160975/header_wvjrzj.jpg'
	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		const theURL = process.env.baseURL
		const sectionID = '5fb107a0a89ab807f04df010'
		if (isMounted.current) {
			fetch(`${theURL}/section/${sectionID}`)
				.then((data) => data.json())
				.then((data) => setHeader(data.section))
				.catch((err) => console.log(err))
		}
	}, [])

	return (
		<>
			{header && (
				<header>
					<Container>
						<article className='img-content'>
							<figure>
								<img src={header.uniqueImage} alt='' />
							</figure>
						</article>
						<article className='text-content'>
							<h1>{header.title}</h1>
							<h2>{header.subtitle}</h2>
						</article>
					</Container>
					<div className='headerbkg'>
						<img src={headerBKG} alt='' />
					</div>
				</header>
			)}
		</>
	)
}

export default Header
