import { OfferCard } from "@/components/affiliate/OfferCard";
export function MerchantProducts() {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-6">
        <OfferCard
          name="Apple iPhone 13"
          from="Apple"
          commission="10%"
          deadline="30th October"
          image="https://images.fixje.nl/wp-content/uploads/2022/09/Refurbished-iPhone-13-zwart-1.png"
          description="The iPhone 13 is the latest and greatest from Apple. It features a new A15 Bionic chip, improved cameras, and a new Super Retina XDR display."
        />
        <OfferCard
          name="Apple iPhone 13"
          from="Apple"
          commission="10%"
          deadline="30th October"
          image="https://images.fixje.nl/wp-content/uploads/2022/09/Refurbished-iPhone-13-zwart-1.png"
          description="The iPhone 13 is the latest and greatest from Apple. It features a new A15 Bionic chip, improved cameras, and a new Super Retina XDR display."
        />
      </div>
    </div>
  );
}
