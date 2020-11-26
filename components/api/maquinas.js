export const getMaquinas = async () => {
	const apiURL = process.env.baseURL
	const resp = await fetch(`${apiURL}/maquinaria`)
	const body = await resp.json()

	return body.data
}

export const getMaquinasById = async (id) => {
	const apiURL = process.env.baseURL
	const resp = await fetch(`${apiURL}/maquinaria/${id}`)
	const body = await resp.json()

	return body.data
}
