import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Card";

export function OfferCard({
  from,
  deadline,
  name,
  image,
  commission,
  description,
}: {
  from: string;
  deadline: string;
  name: string;
  image: string;
  commission: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Offer from {from}</CardDescription>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <CardDescription>{description}</CardDescription>
          <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Commission</h3>
              <p>{commission}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Deadline</h3>
              <p>{deadline}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
