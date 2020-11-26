import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { getCompany } from '../api/company'

const NavBar = ({ clase }) => {
	const isMounted = useRef(true)
	const theNav = useRef()
	const [theCompany, setTheCompany] = useState()

	const fetchCompany = async () => {
		const companyFetched = await getCompany()
		setTheCompany(companyFetched)
	}

	useEffect(() => {
		if (isMounted.current) {
			fetchCompany()
		}
		return () => {
			isMounted.current = false
		}
	}, [theCompany])

	useEffect(() => {
		window.addEventListener('scroll', addClass)
		return () => {
			window.removeEventListener('scroll', addClass)
		}
	}, [])

	const addClass = () => {
		let navDom = theNav.current
		let navHeight = navDom.offsetHeight
		if (window.scrollY > navHeight) {
			return navDom.classList.add('scrolled')
		} else {
			return navDom.classList.remove('scrolled')
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
								<Link href='/#maquinaria'>
									<a>Maquinaria</a>
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
								<a href='#ubicación'>Ubicación</a>
							</li>
							<li>
								<a href='#contacto'>Contacto</a>
							</li>
						</ul>
						{(theCompany.twitter || theCompany.facebook || theCompany.linkedin || theCompany.instagram) && (
							<ul className='rrss-buttons'>
								{theCompany.facebook && (
									<a href={theCompany.facebook} className='rrss-icon' target='_blank'>
										<FontAwesomeIcon icon={faFacebookSquare} />
									</a>
								)}
								{theCompany.twitter && (
									<a href={theCompany.twitter} className='rrss-icon' target='_blank'>
										<FontAwesomeIcon icon={faTwitterSquare} />
									</a>
								)}
								{theCompany.instagram && (
									<a href={theCompany.instagram} className='rrss-icon' target='_blank'>
										<FontAwesomeIcon icon={faInstagramSquare} />
									</a>
								)}
								{theCompany.linkedin && (
									<a href={theCompany.linkedin} className='rrss-icon' target='_blank'>
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
