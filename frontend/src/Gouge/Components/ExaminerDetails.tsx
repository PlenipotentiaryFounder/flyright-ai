import React from 'react'
import ScrollArea from "../../Common/Components/ScrollArea"
import Card from "../../Common/Components/Card"
import Button from "../../Common/Components/Button"
import { User, Bookmark, PlusCircle } from 'lucide-react'
import { Gouge } from '../types/gougeTypes'

interface ExaminerDetailsProps {
  examiner: Gouge
}

export default function ExaminerDetails({ examiner }: ExaminerDetailsProps) {
  return (
    <div className="w-2/3">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <Card className="p-6">
          <div className="flex items-start mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full mr-6 flex items-center justify-center">
              <User className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{examiner.examiner_name}</h2>
              <p className="text-gray-600">Date: {examiner.date}</p>
              <p className="mt-2">Outcome: {examiner.outcome}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Gouge Details</h3>
            <p>{examiner.text}</p>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline">
              <Bookmark className="h-4 w-4 mr-2" />
              Save Gouge
            </Button>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Your Gouge
            </Button>
          </div>
        </Card>
      </ScrollArea>
    </div>
  )
}