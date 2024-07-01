import { LucideIcon } from "lucide-react";
export function StatCard({
  name,
  money,
  value,
  unit,
  change,
  Icon,
  className,
}: {
  name: string;
  money?: boolean;
  value: number;
  unit?: string;
  change?: number;
  Icon?: LucideIcon;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {Icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full ">
          <Icon size={24} />
        </div>
      )}
      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-400">{`${money ? "$" : ""}${value} ${unit ? unit : ""}`} </div>
      </div>
      {change && <div className="font-semibold">{change}%</div>}
    </div>
  );
}
