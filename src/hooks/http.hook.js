import {useState, useCallback} from 'react'

export const  useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response =  await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                let errorMessage = 'Error !!!'
                if (typeof(data.detail) === 'string') {
                    errorMessage = data.detail.replaceAll('_', ' ').toLocaleLowerCase()
                } else if (Array.isArray(data.detail)) {
                    errorMessage = data.detail.map((obj) => obj.msg).join('<br>')
                }
                throw new Error(errorMessage)
            }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, request, error, clearError}
}
