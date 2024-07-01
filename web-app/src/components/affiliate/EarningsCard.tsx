export function EarningsCard({ name, earnings }: { name: string; earnings: number }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{`$${earnings} in commissions`}</div>
      </div>
    </div>
  );
}
