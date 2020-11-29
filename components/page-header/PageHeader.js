import React from 'react'

export const PageHeader = ({ title, bkg }) => {
	const headerBKG = 'https://res.cloudinary.com/mbr-app/image/upload/v1606160975/header_wvjrzj.jpg'
	return (
		<>
			{bkg ? (
				<header style={{ backgroundImage: `url(${bkg})` }} className='page-header'>
					<div className='container'>
						<h2 className='header-subtitle'>{title}</h2>
					</div>
				</header>
			) : (
				<header style={{ backgroundImage: `url(${headerBKG})` }} className='page-header'>
					<div className='container'>
						<h2 className='header-subtitle'>{title}</h2>
					</div>
				</header>
			)}
		</>
	)
}
