import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function Sidebar() {
  return (
    <div className="p-6">
      <div className="lg:hidden">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Favorites" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Prompts 1">Prompts 1</SelectItem>
            <SelectItem value="Prompts 2">Prompts 2</SelectItem>
            <SelectItem value="Prompts 3">Prompts 3</SelectItem>
            <SelectItem value="Prompts 4">Product feature prompt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
