import { Card, CardContent } from "@/components/ui/card";

type statsCardProps={
    icon:React.ElementType;
    label:string;
    value:string;
    bgColor:string;
    iconColor:string;
}

const StatsCard = ({icon:Icon,iconColor,label,bgColor,value}:statsCardProps) => {
  return (
    <Card className="bg-zinc-800/45 border-zinc-600 hover:bg-zinc-700 transition-colors">
        <CardContent className="p-6">
           <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${bgColor}`}>
                 <Icon className={`size-6 ${iconColor}`} />
            </div>
            <div>
                <p className="text-sm text-zinc-400">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
           </div>
        </CardContent>
    </Card>
  )
}

export default StatsCard