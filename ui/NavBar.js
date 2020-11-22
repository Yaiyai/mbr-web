import React from 'react'
import Link from 'next/link'
import { Container } from 'semantic-ui-react'

const NavBar = () => {
	return (
		<nav className='desktop-nav'>
			<Container>
				<div>
					<a href='/' id='nav-logo'></a>
					<ul className='left'>
						<li>
							<a href='#historia'>Historia</a>
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
					<ul className='rrss-buttons'></ul>
				</div>
			</Container>
		</nav>
	)
}

export default NavBar
