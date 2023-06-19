const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const searchUrl = `https://api.unsplash.com/search/photos/`

export const fetchPhotos = async ({ page = 1, query }) => {
	const urlPage = `&page=${page}`
	const urlQuery = `&query=${query}`
	const url = `${searchUrl}${clientID}${urlPage}${urlQuery}`

	console.log('*', { page, url, query })

	return await fetch(url)
		.then(async res => {
			if (!res.ok) throw new Error('There was an error')
			return await res.json()
		})
		.then(res => {
			const nextCursor = page > 10 ? undefined : page + 1

			return {
				photos: res.results,
				nextCursor
			}
		})
}
