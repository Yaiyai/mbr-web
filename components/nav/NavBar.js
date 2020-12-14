import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
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

	const showMenu = () => {
		theNav.current.classList.toggle('open-submenu')
		const subMenu = theNav.current.querySelector('.sub-menu')
		subMenu.classList.toggle('show')
	}
	const hideMenu = () => {
		const subMenu = theNav.current.querySelector('.sub-menu')
		subMenu.classList.remove('show')
	}

	return (
		<nav ref={theNav} className={`desktop-nav ${clase}`}>
			{theCompany && (
				<>
					<div className='desktop container'>
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
								<li>
									<Link href='/calidad'>
										<a>Calidad</a>
									</Link>
								</li>
								<li>
									<Link href='/calidad#certificaciones'>
										<a>Certificaciones</a>
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<ul className='right'>
								<li>
									<Link href='/#contacto'>
										<a>Contacto</a>
									</Link>
								</li>
								<li>
									<Link href='/#ubicacion'>
										<a>Ubicación</a>
									</Link>
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
					</div>
					<div className='mobile container'>
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
						<div className='fix'>
							<button onClick={showMenu}>
								<FontAwesomeIcon icon={faBars} />
							</button>
						</div>

						<ul className='sub-menu'>
							<li onClick={hideMenu}>
								<Link href='/#historia'>
									<a>Historia</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/#instalaciones'>
									<a>Instalaciones</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/#trabajos'>
									<a>Trabajos</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/parque-de-maquinaria'>
									<a>Maquinaria</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/calidad'>
									<a>Calidad</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/calidad#certificaciones'>
									<a>Certificaciones</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/#ubicacion'>
									<a>Ubicación</a>
								</Link>
							</li>
							<li onClick={hideMenu}>
								<Link href='/#contacto'>
									<a>Contacto</a>
								</Link>
							</li>
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
						</ul>
					</div>
				</>
			)}
		</nav>
	)
}

export default NavBar
