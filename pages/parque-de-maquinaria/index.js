import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { getMaquinas } from '../../components/api/maquinas'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'
import { getCompany } from '../../components/api/company'
import { useContext } from 'react'
import { CompanyContextNew } from '../../context/CompanyContextNew'
import Dropdown from 'react-bootstrap/Dropdown'

const ParqueDeMaquinaria = ({ theMaquinas, thisSection }) => {
	const [allMaquinas] = useState(theMaquinas)
	const [filter, setfilter] = useState(theMaquinas)
	const [section] = useState(thisSection)
	const [selected, setSelected] = useState('Ver todas')
	const { companyFetched } = useContext(CompanyContextNew)

	const filterThisCategory = (id) => {
		setSelected(id)
		if (id === 'Ver todas') {
			setfilter(theMaquinas)
		} else {
			setfilter(allMaquinas.filter((elm) => elm.category === id))
		}
	}

	return (
		<>
			<BasicLayout location={'parque'}>
				<Head>
					<title>Parque de Maquinaria || MBR</title>
				</Head>
				<PageHeader title={section.title} bkg={section.uniqueImage} />
				<section className='cat-filter container'>
					<Dropdown>
						<Dropdown.Toggle className='my-btn secondary mini' id='dropdown-basic'>
							Filtrar por categoría
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item id='Ver todas' onClick={() => filterThisCategory('Ver todas')}>
								Ver todas
							</Dropdown.Item>
							{companyFetched?.maquinasCategories.map((elm) => (
								<Dropdown.Item key={elm} id={elm} onClick={() => filterThisCategory(elm)}>
									{elm}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					{selected !== 'Ver todas' && (
						<p>
							Máquinas filtradas por <strong>{selected}</strong>
						</p>
					)}
				</section>

				{filter?.length > 0 ? (
					<section className='all-maquinas container'>
						{filter?.map((maq) => (
							<article key={maq._id} id={maq.category} className='each-maquina'>
								<div className='inner'>
									<figure className='left'>
										<img src={maq.image} alt={maq.name} />
									</figure>
									<div className='right'>
										<p className='maquina-name'>{maq.name}</p>
										<Link href={`/parque-de-maquinaria/${maq._id}`}>
											<a className='my-btn secondary mini'>Ver máquina</a>
										</Link>
									</div>
								</div>
							</article>
						))}
					</section>
				) : (
					<section className='all-maquinas container'>
						<p>No hay máquinas en esta categoría</p>
					</section>
				)}
			</BasicLayout>
		</>
	)
}

export const getServerSideProps = async () => {
	const companyFetched = await getCompany()
	const theMaquinas = await getMaquinas()
	const thisSection = await getThisSection('5fb15988fb855731d4d459df')
	return { props: { theMaquinas, thisSection, companyFetched } }
}

export default ParqueDeMaquinaria
