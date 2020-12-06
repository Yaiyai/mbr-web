import React from 'react'
import { getCompany } from '../../components/api/company'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'
import BasicLayout from '../../layouts/BasicLayout'

const Subvenciones = ({ thisSection }) => {
	return (
		<>
			{thisSection && (
				<BasicLayout content={'parque'}>
					<PageHeader title={thisSection.title} />
					<section className='subvenciones'>
						<div className='all-subvs container'>
							{thisSection?.gallery.map((elm) => (
								<figure key={elm} className='each-subv'>
									<img src={elm} alt='' />
								</figure>
							))}
						</div>
					</section>
				</BasicLayout>
			)}
		</>
	)
}

export const getServerSideProps = async () => {
	const companyFetched = await getCompany()
	const thisSection = await getThisSection('5fb15a0bfb855731d4d459e0')
	return { props: { thisSection, companyFetched } }
}

export default Subvenciones
