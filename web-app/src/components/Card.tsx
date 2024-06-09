import React from "react";

// Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>{children}</div>;
};

// CardHeader Component
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

// CardTitle Component
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
};

// CardDescription Component
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return <p className={`text-gray-500 dark:text-gray-400 ${className}`}>{children}</p>;
};

// CardContent Component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-black text-white rounded-md w-full text-center hover:bg-gray-800 ${className}`}
    >
      {children}
    </button>
  );
};

// Example Card Component
const ExampleCard: React.FC = () => {
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Total Earnings</CardTitle>
        <CardDescription>All time earnings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center mb-4">
          <span className="text-gray-500 dark:text-gray-400 text-2xl">$</span>
        </div>
        <div className="text-3xl font-bold text-center">$12,345</div>
      </CardContent>
    </Card>
  );
};

// Onboarding Card Component
const OnboardingCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>Get started with your affiliate program</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Link your Shopify account</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Connect your Shopify store to import your products and start creating affiliate offers.
            </p>
            <Button>Connect Shopify</Button>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Create a Farcaster account</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Easily share your affiliate offers on Farcaster channels to reach more potential customers.
            </p>
            <Button>Create Farcaster Account</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, ExampleCard, OnboardingCard };
