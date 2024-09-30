import express from 'express';
const router = express.Router();

// Mock data
const examiners = [
  { id: 1, name: "John Smith", location: "New York, NY", snippet: "Experienced examiner with a focus on safety procedures." },
  { id: 2, name: "Jane Doe", location: "Los Angeles, CA", snippet: "Known for thorough oral examinations and challenging maneuvers." },
  { id: 3, name: "Robert Johnson", location: "Chicago, IL", snippet: "Fair and consistent examiner with a calm demeanor." },
];

const gouges = [
  { id: 1, date: "2023-09-15", outcome: "pass", text: "The examiner was thorough but fair. Focused heavily on emergency procedures during the oral portion." },
  { id: 2, date: "2023-08-30", outcome: "fail", text: "Challenging flight portion. Make sure to practice steep turns and soft-field landings." },
  { id: 3, date: "2023-08-10", outcome: "pass", text: "Straightforward checkride. Examiner was friendly and put me at ease. Review your weather knowledge." },
];

// Endpoint to get examiners
router.get('/examiners', (req, res) => {
  res.json(examiners);
});

// Endpoint to get gouges
router.get('/gouges', (req, res) => {
  res.json(gouges);
});

export default router;