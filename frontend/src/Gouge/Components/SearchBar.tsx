import React from 'react'
import { Input } from "../../Common/Components/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Common/Components/Select"
import   Button from "../../Common/Components/Button"
import { Search } from 'lucide-react'

interface SearchBarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedStage: string
  setSelectedStage: (stage: string) => void
  handleSearch: () => void
}

const stages = ["Private Pilot", "Instrument", "Commercial", "ATP"]

export default function SearchBar({ searchTerm, setSearchTerm, selectedStage, setSelectedStage, handleSearch }: SearchBarProps) {
  return (
    <div className="mb-6 flex space-x-4">
      <div className="flex-grow">
        <Input
          type="text"
          placeholder="Search gouges by examiner name or content"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Select onValueChange={setSelectedStage}>
        <SelectTrigger>
          <div className="w-[200px]">
            <SelectValue placeholder="Select Stage" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {stages.map((stage) => (
            <SelectItem key={stage} value={stage}>{stage}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleSearch} className="bg-sky-600 hover:bg-sky-700 text-white">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}