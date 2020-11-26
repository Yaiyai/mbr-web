export const getCompany = async () => {
	const apiURL = process.env.baseURL
	const resp = await fetch(`${apiURL}/company`)
	const body = await resp.json()

	return body.company[0]
}
