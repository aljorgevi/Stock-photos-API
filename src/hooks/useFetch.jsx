import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchPhotos } from '../services/fetchPhotos'
import { useEffect, useState } from 'react'

const useDebounce = (value, delay = 400) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [value, delay])

	return debouncedValue
}

export const useFetch = ({ query, page }) => {
	const debouncedQuery = useDebounce(query || 'chile')
	const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage, error } = useInfiniteQuery(
		['photos', debouncedQuery],
		({ pageParam }) => fetchPhotos({ query: debouncedQuery, page: pageParam }), // Use pageParam instead of debouncedQuery
		{
			getNextPageParam: lastPage => lastPage.nextCursor, // Use nextCursor from the last page
			refetchOnWindowFocus: false,
			staleTime: 1000 * 3
		}
	)

	useEffect(() => {
		refetch()
	}, [debouncedQuery, page, refetch]) // Include page in the dependency array

	return {
		refetch,
		fetchNextPage,
		isLoading,
		isError,
		data: data?.pages.flatMap(page => page.photos) ?? [],
		hasNextPage,
		error
	}
}
