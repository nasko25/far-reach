import { ArrowUpRight } from "lucide-react";
import { Button } from "./Button";

export function ProductCard({ image, name, commission }: { image: string; name: string; commission: number }) {
  return (
    <div className="flex items-center gap-4">
      <img src={image} width={64} height={64} alt="Product Image" className="rounded-lg" />
      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{`${Math.floor(commission * 100)}% commission`}</div>
      </div>
      <Button variant="ghost">
        <ArrowUpRight size={24} />
      </Button>
    </div>
  );
}
