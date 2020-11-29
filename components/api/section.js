export const getThisSection = async (sectionID) => {
	const theURL = process.env.baseURL
	const resp = await fetch(`${theURL}/section/${sectionID}`)
	const body = await resp.json()
	return body.section
}
export const getSections = async () => {
	const theURL = process.env.baseURL
	const resp = await fetch(`${theURL}/section/`)
	const body = await resp.json()
	return body.sections
}
