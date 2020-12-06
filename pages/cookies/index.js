import React from 'react'
import { getCompany } from '../../components/api/company'
import { getThisSection } from '../../components/api/section'
import { PageHeader } from '../../components/page-header/PageHeader'
import BasicLayout from '../../layouts/BasicLayout'

const Cookies = ({ thisSection }) => {
	return (
		<>
			{thisSection && (
				<BasicLayout content={'parque'}>
					<PageHeader title={thisSection.title} />
					<section className='container legal'>
						<div className='text-editor' dangerouslySetInnerHTML={thisSection.parsedText}></div>
					</section>
				</BasicLayout>
			)}
		</>
	)
}

export const getServerSideProps = async () => {
	const companyFetched = await getCompany()
	const thisSection = await getThisSection('5fccbdcf3ee3730017c3be7e')
	return { props: { thisSection, companyFetched } }
}

export default Cookies
