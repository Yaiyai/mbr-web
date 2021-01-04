import React, { useEffect, useRef, useState } from 'react'

export const Historia = ({ sections }) => {
	const [historia, setHistoria] = useState()
	const [cortes, setCortes] = useState()
	const [gracias, setGracias] = useState()

	const isMounted = useRef(true)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		const sectionID = '5ff2e2441167a80015ccfead'
		if (isMounted.current) {
			setHistoria(sections?.find((elm) => elm._id === sectionID))
			if (historia) {
				const allText = historia.text.split('((GRACIAS))')
				const graciasText = allText[1]
				const years = allText[0].split('((CORTE))')
				const yearsText = years.map((elm) => {
					return {
						__html: elm,
					}
				})
				setCortes(yearsText)
				setGracias({ __html: graciasText })
			}
		}
	}, [historia])

	return (
		<>
			{historia && (
				<section id='historia' className='historia'>
					<div className='container'>
						<p className='subtitle'>{historia.subtitle}</p>
						<h2>{historia.title}</h2>
						<article className='timeline'>
							<div className='line'></div>
							<div className='fix'>{cortes && cortes.map((elm, idx) => <div className='text-editor each-hit' key={idx} dangerouslySetInnerHTML={elm}></div>)}</div>
						</article>
						{gracias && <div className='text-editor gracias' dangerouslySetInnerHTML={gracias}></div>}
					</div>
				</section>
			)}
		</>
	)
}
