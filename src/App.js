import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
import { useFetch } from './hooks/useFetch'

function App() {
	const [query, setQuery] = useState(null)
	const {
		refetch,
		fetchNextPage,
		isLoading: searchLoading,
		isError,
		data,
		hasNextPage,
		error
	} = useFetch({
		query
	})
	const [loadMoreLoading, setLoadMoreLoading] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		refetch()
	}

	const handleLoadMore = async () => {
		setLoadMoreLoading(true)
		await fetchNextPage()
		setLoadMoreLoading(false)
	}

	return (
		<main>
			<section className='search'>
				<form action='' className='search-form' onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='search'
						className='form-input'
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
					<button
						style={{
							cursor: 'pointer'
						}}
						className='submit-btn'
						type='submit'
					>
						<FaSearch />
					</button>
				</form>
				{(searchLoading || loadMoreLoading) && <h2 className='loading'>Loading...</h2>}
			</section>
			<div className='photos'>
				<div className='photos-center'>
					{data.map((image, index) => {
						return <Photo key={index} {...image} />
					})}
				</div>

				{!searchLoading && !isError && (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '2rem'
						}}
					>
						<button
							style={{
								cursor: 'pointer'
							}}
							className='btn'
							onClick={handleLoadMore}
							disabled={!hasNextPage || loadMoreLoading}
						>
							{loadMoreLoading ? 'Loading...' : 'Load more ...'}
						</button>
					</div>
				)}
			</div>
		</main>
	)
}

export default App
