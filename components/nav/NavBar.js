import React, { useContext, useEffect, useRef } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { CompanyContext } from '../../context/companyContext'

const NavBar = () => {
	const theCompany = useContext(CompanyContext)
	const { mainLogo, secondaryLogo, twitter, facebook, linkedin, instagram } = theCompany
	const theNav = useRef(true)

	const addClass = () => {
		let navDom = theNav.current
		let navHeight = navDom.offsetHeight
		if (window.scrollY > navHeight) {
			return navDom.classList.add('scrolled')
		} else {
			return navDom.classList.remove('scrolled')
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', addClass)
		return () => {
			window.removeEventListener('scroll', addClass)
		}
	}, [])

	return (
		<nav ref={theNav} className='desktop-nav'>
			<Container>
				<div>
					<Link href='/'>
						<a id='main-logo' className='nav-logo'>
							<img src={mainLogo} alt='' />
						</a>
					</Link>
					<Link href='/'>
						<a id='secondary-logo' className='nav-logo'>
							<img src={secondaryLogo} alt='' />
						</a>
					</Link>
					<ul className='left'>
						<li>
							<Link href='/#historia'>
								<a>Historia</a>
							</Link>
						</li>
						<li>
							<a href='#instalaciones'>Instalaciones</a>
						</li>
						<li>
							<a href='#trabajos'>Trabajos</a>
						</li>
						<li>
							<Link href='/parque-de-maquinaria'>
								<a>Maquinaria</a>
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<ul className='right'>
						<li>
							<a href='#ubicación'>Ubicación</a>
						</li>
						<li>
							<a href='#contacto'>Contacto</a>
						</li>
					</ul>
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
				</div>
			</Container>
		</nav>
	)
}

export default NavBar
