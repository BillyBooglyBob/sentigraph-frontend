import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  date: string;
}

const DashboardCard = ({ title, value, date }: DashboardCardProps) => {
  return (
    <Card className="grow bg-slate-100 dark:bg-slate-800 p-4">
      <CardHeader>
        <CardTitle className="text-sm text-slate-500 dark:text-slate-200">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl text-slate-500 dark:text-slate-200">{value}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p>{date}</p>
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
