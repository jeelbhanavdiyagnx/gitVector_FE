import EventMessage from "./eventMessage";
import { formatDateForActivity } from "@/components/utils/helper";

export default function EventCardComponent({ item }) {
  
  return (
    <div className="flex flex-col gap-2 mt-2">
      <h1 className="font-medium text-md">{formatDateForActivity(item.day)}</h1>
      <div className="flex flex-col gap-2 px-2">
        {item.list.map((li, index) => (
          <EventMessage key={index} item={li} />
        ))}
      </div>
    </div>
  );
}
