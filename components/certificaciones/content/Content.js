import React from 'react'

export const Content = ({ introduccion, medicion, software, marcadora }) => {
	const medicionImage = 'https://res.cloudinary.com/mbr-app/image/upload/v1607972154/contenido-calidad_mediciones_fdktbr.png'
	const softwareImage = 'https://res.cloudinary.com/mbr-app/image/upload/v1607972154/contenido-calidad_software_zhcoms.png'
	const marcadoraImage = 'https://res.cloudinary.com/mbr-app/image/upload/v1607972154/contenido-calidad_marcadora_yfizb6.png'

	return (
		<article>
			{introduccion && <div className='text-editor calidad-editor' dangerouslySetInnerHTML={introduccion}></div>}
			{medicion && (
				<div className='text-image'>
					<div className='text-editor calidad-editor' dangerouslySetInnerHTML={medicion}></div>
					<img src={medicionImage} alt='' />
				</div>
			)}
			{software && (
				<div className='text-image'>
					<div className='text-editor calidad-editor' dangerouslySetInnerHTML={software}></div>
					<img src={softwareImage} alt='' />
				</div>
			)}
			{marcadora && (
				<div className='text-image'>
					<div className='text-editor calidad-editor' dangerouslySetInnerHTML={marcadora}></div>
					<img src={marcadoraImage} alt='' />
				</div>
			)}
		</article>
	)
}
