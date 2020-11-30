import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

const NavBar = ({ clase, company }) => {
	const [theHeight, setHeight] = useState(0)
	const isMounted = useRef(true)
	const theNav = useRef(null)
	const [theCompany] = useState(company)

	useEffect(() => {
		setHeight(theNav.current.clientHeight)
		if (theNav) {
			window.addEventListener('scroll', addClass)
		}
		return () => {
			window.removeEventListener('scroll', addClass)
			isMounted.current = false
		}
	}, [theNav, theHeight])

	const addClass = () => {
		if (window.scrollY > theHeight) {
			return theNav.current.classList.add('scrolled')
		} else {
			return theNav.current.classList.remove('scrolled')
		}
	}

	return (
		<nav ref={theNav} className={`desktop-nav ${clase}`}>
			{theCompany && (
				<Container>
					<div>
						<Link href='/'>
							<a id='main-logo' className='nav-logo'>
								<img src={theCompany.mainLogo} alt='' />
							</a>
						</Link>
						<Link href='/'>
							<a id='secondary-logo' className='nav-logo'>
								<img src={theCompany.secondaryLogo} alt='' />
							</a>
						</Link>
						<ul className='left'>
							<li>
								<Link href='/#historia'>
									<a>Historia</a>
								</Link>
							</li>
							<li>
								<Link href='/#instalaciones'>
									<a>Instalaciones</a>
								</Link>
							</li>
							<li>
								<Link href='/#trabajos'>
									<a>Trabajos</a>
								</Link>
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
								<a href='/#ubicación'>Ubicación</a>
							</li>
							<li>
								<a href='/#contacto'>Contacto</a>
							</li>
						</ul>
						{(theCompany.twitter || theCompany.facebook || theCompany.linkedin || theCompany.instagram) && (
							<ul className='rrss-buttons'>
								{theCompany.facebook && (
									<a href={theCompany.facebook} className='rrss-icon' target='new'>
										<FontAwesomeIcon icon={faFacebookSquare} />
									</a>
								)}
								{theCompany.twitter && (
									<a href={theCompany.twitter} className='rrss-icon' target='new'>
										<FontAwesomeIcon icon={faTwitterSquare} />
									</a>
								)}
								{theCompany.instagram && (
									<a href={theCompany.instagram} className='rrss-icon' target='new'>
										<FontAwesomeIcon icon={faInstagramSquare} />
									</a>
								)}
								{theCompany.linkedin && (
									<a href={theCompany.linkedin} className='rrss-icon' target='new'>
										<FontAwesomeIcon icon={faLinkedin} />
									</a>
								)}
							</ul>
						)}
					</div>
				</Container>
			)}
		</nav>
	)
}

export default NavBar
