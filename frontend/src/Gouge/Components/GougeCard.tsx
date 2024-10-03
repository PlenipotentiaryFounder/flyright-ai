import React from 'react'
import Card from "../../Common/Components/Card"
import { Gouge } from '../types/gougeTypes'

interface GougeCardProps {
  gouge: Gouge
  isSelected: boolean
  onSelect: (gouge: Gouge) => void
}

export default function GougeCard({ gouge, isSelected, onSelect }: GougeCardProps) {
  return (
    <Card 
      className={`p-4 mb-4 cursor-pointer ${isSelected ? 'border-sky-600' : ''}`}
      onClick={() => onSelect(gouge)}  // Use onClick directly on Card
    >
      <h3 className="font-semibold">{gouge.examiner_name}</h3>
      <p className="text-sm text-gray-600">{gouge.date}</p>
      <p className="text-sm mt-2">{gouge.text.substring(0, 100)}...</p>
    </Card>
  )
}