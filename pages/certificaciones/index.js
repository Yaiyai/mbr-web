import React from 'react'
import { getCompany } from '../../components/api/company'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'
import BasicLayout from '../../layouts/BasicLayout'

const Certificaciones = ({ thisSection }) => {
	return (
		<BasicLayout location={'parque'}>
			<section className='certificaciones'>
				<PageHeader title={thisSection.title} bkg={thisSection.uniqueImage} />
			</section>
		</BasicLayout>
	)
}
export const getServerSideProps = async () => {
	const companyFetched = await getCompany()
	const thisSection = await getThisSection('5fb24be4e85717001704d549')
	return { props: { thisSection, companyFetched } }
}

export default Certificaciones
