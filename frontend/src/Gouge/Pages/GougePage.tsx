import React, { useState, useEffect } from 'react'
import Header from '../../Common/Components/Header'
import SearchBar from '../Components/SearchBar'
import GougeList from '../Components/GougeList'
import ExaminerDetails from '../Components/ExaminerDetails'
import { Gouge } from '../types/gougeTypes'
import api from '../../utils/api'

export default function GougePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("")
  const [selectedExaminer, setSelectedExaminer] = useState<Gouge | null>(null)
  const [gouges, setGouges] = useState<Gouge[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGouges()
  }, [])

  const fetchGouges = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.get('/gouge/gouges/')
      setGouges(response.data)
    } catch (error) {
      console.error('Error fetching gouges:', error)
      setError('Failed to fetch gouges. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await api.get<Gouge[]>(`/gouge/gouges/?search=${searchTerm}&stage=${selectedStage}`)
      setGouges(response.data)
    } catch (error) {
      console.error('Error searching gouges:', error)
      setError('Failed to search gouges. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExaminerSelect = (gouge: Gouge) => {
    setSelectedExaminer(gouge)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header placeholderConversations={[]} />

      <main className="flex-grow p-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
            handleSearch={handleSearch}
          />

          {isLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex space-x-6">
            <GougeList 
              gouges={gouges} 
              selectedExaminer={selectedExaminer} 
              handleExaminerSelect={handleExaminerSelect} 
            />

            {selectedExaminer && (
              <ExaminerDetails examiner={selectedExaminer} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}