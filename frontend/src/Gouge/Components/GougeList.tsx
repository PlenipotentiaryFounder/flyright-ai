import React from 'react'
import ScrollArea from "../../Common/Components/ScrollArea"
import Card from "../../Common/Components/Card"
import GougeCard from './GougeCard'
import { Gouge } from '../../Gouge/types/gougeTypes'

interface GougeListProps {
  gouges: Gouge[]
  selectedExaminer: Gouge | null
  handleExaminerSelect: (gouge: Gouge) => void
}

export default function GougeList({ gouges, selectedExaminer, handleExaminerSelect }: GougeListProps) {
  return (
    <div className="w-1/3">
      <h2 className="text-lg font-semibold mb-4">Gouges</h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {gouges.map((gouge) => (
          <GougeCard 
            key={gouge.id}
            gouge={gouge}
            isSelected={selectedExaminer?.id === gouge.id}
            onSelect={handleExaminerSelect}
          />
        ))}
      </ScrollArea>
    </div>
  )
}