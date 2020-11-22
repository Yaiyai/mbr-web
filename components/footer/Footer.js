import React from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = ({ theCompany }) => {
	const { secondaryLogo, instagram, twitter, facebook, linkedin, phone, address, name } = theCompany

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
				<article className='contact-area'>
					<div className='contact'>
						<p>
							{phone} &middot; {address}
						</p>
					</div>
					<div className='dots-box'></div>
					{(twitter || facebook || linkedin || instagram) && (
						<ul className='rrss-buttons'>
							{facebook && (
								<a href={facebook} className='rrss-icon' target='_blank'>
									<FontAwesomeIcon icon={faFacebookSquare} />
								</a>
							)}
							{twitter && (
								<a href={twitter} className='rrss-icon' target='_blank'>
									<FontAwesomeIcon icon={faTwitterSquare} />
								</a>
							)}
							{instagram && (
								<a href={instagram} className='rrss-icon' target='_blank'>
									<FontAwesomeIcon icon={faInstagramSquare} />
								</a>
							)}
							{linkedin && (
								<a href={linkedin} className='rrss-icon' target='_blank'>
									<FontAwesomeIcon icon={faLinkedin} />
								</a>
							)}
						</ul>
					)}
				</article>
				<article className='logo-copy'>
					<figure>
						<img src={secondaryLogo} alt='' />
					</figure>
					<small>&copy; {name}</small>
				</article>
			</Container>
		</footer>
	)
}

export default Footer
