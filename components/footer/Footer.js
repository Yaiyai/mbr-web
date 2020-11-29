import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

import { useRef } from 'react'

const Footer = ({ company }) => {
	const isMounted = useRef(true)
	const [footerCompany] = useState(company)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return (
		<footer>
			<Container>
				<article className='navs'>
					<div className='first'>
						<p>Nosotros</p>
						<ul>
							<li>
								<a href='#'>Historia</a>
							</li>
							<li>
								<a href='#'>Ubicación</a>
							</li>
						</ul>
					</div>
					<div className='second'>
						<p>Maquinaria</p>
						<ul>
							<li>
								<a href='#'>Instalaciones</a>
							</li>
							<li>
								<Link href='/parque-de-maquinaria'>
									<a>Maquinaria</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className='third'>
						<p>Trabajos</p>
						<ul>
							<li>
								<a href='#'>Trabajos</a>
							</li>
						</ul>
					</div>
					<div className='fourth'>
						<p>Condiciones Legales</p>
						<ul>
							<li>
								<a>Política de Privacidad</a>
							</li>
							<li>
								<a>Términos y condiciones</a>
							</li>
							<li>
								<a>Cookies</a>
							</li>
						</ul>
					</div>
				</article>
				{footerCompany && (
					<>
						<article className='contact-area'>
							<div className='contact'>
								<p>
									{footerCompany.phone} &middot; {footerCompany.address}
								</p>
							</div>
							<div className='dots-box'></div>
							{(footerCompany.twitter || footerCompany.facebook || footerCompany.linkedin || footerCompany.instagram) && (
								<ul className='rrss-buttons'>
									{footerCompany.facebook && (
										<a href={footerCompany.facebook} className='rrss-icon' target='_blank'>
											<FontAwesomeIcon icon={faFacebookSquare} />
										</a>
									)}
									{footerCompany.twitter && (
										<a href={footerCompany.twitter} className='rrss-icon' target='_blank'>
											<FontAwesomeIcon icon={faTwitterSquare} />
										</a>
									)}
									{footerCompany.instagram && (
										<a href={footerCompany.instagram} className='rrss-icon' target='_blank'>
											<FontAwesomeIcon icon={faInstagramSquare} />
										</a>
									)}
									{footerCompany.linkedin && (
										<a href={footerCompany.linkedin} className='rrss-icon' target='_blank'>
											<FontAwesomeIcon icon={faLinkedin} />
										</a>
									)}
								</ul>
							)}
						</article>
						<article className='logo-copy'>
							<figure>
								<img src={footerCompany.secondaryLogo} alt='' />
							</figure>
							<small>&copy; {footerCompany.name}</small>
						</article>
					</>
				)}
			</Container>
		</footer>
	)
}

export default Footer
