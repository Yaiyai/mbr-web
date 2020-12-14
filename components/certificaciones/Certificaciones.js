import React from 'react'

const Certificaciones = ({ certificaciones }) => {
	return (
		<section className='certificaciones'>
			<h2>{certificaciones?.title}</h2>
			<div className='all-certs container'>
				{certificaciones?.gallery.map((elm) => (
					<figure key={elm} className='each-cert'>
						<img src={elm} alt='' />
					</figure>
				))}
			</div>
		</section>
	)
}

export default Certificaciones
