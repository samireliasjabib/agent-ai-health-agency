import { useState, useCallback } from "react"
import type { ClientData } from "../types/client"
import { sampleClients } from "../data/sample-clients"

export function useClientData() {
  const [data, setData] = useState<ClientData[]>(sampleClients)
  const [isLoading, setIsLoading] = useState(false)

  const syncData = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // In a real app, you would fetch data from an API here
      // const newData = await fetchClientsFromAPI()
      // setData(newData)
    } catch (error) {
      console.error("Error syncing data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    data,
    isLoading,
    syncData,
  }
}
