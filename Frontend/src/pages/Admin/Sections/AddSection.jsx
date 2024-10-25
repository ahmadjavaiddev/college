import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AddSection = () => {
  const [sectionName, setSectionName] = useState('')
  const [discipline, setDiscipline] = useState('')
  const [year, setYear] = useState('')
  const [classTeacher, setClassTeacher] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log({ sectionName, discipline, year, classTeacher })
  }

  return (
    <Card className="w-[350px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>Add New Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sectionName">Section Name</Label>
            <Input
              id="sectionName"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discipline">Discipline</Label>
            <Input
              id="discipline"
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select onValueChange={setYear} required>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="classTeacher">Class Teacher</Label>
            <Input
              id="classTeacher"
              value={classTeacher}
              onChange={(e) => setClassTeacher(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Section</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddSection
