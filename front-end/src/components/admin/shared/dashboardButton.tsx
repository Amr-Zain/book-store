import { JSX } from "react";
import { Link } from "react-router";

const DashboardButton = ({
    to,
    label,
    icon,
    variant = 'solid'
  }: {
    to: string;
    label: string;
    icon: JSX.Element;
    variant?: 'solid' | 'outline';
  }) => (
    <Link
      to={to}
      className={`inline-flex items-center px-5 py-3 rounded-md mb-3 ${
        variant === 'solid' 
          ? 'text-white bg-primary hover:bg-primary-dark' 
          : 'text-primary  focus:bg-purple-100 border border-primary'
      } ${variant === 'solid' ? 'ml-6' : ''}`}
    >
      <span className="flex-shrink-0 -ml-1 mt-0.5 mr-2">{icon}</span>
      {label}
    </Link>
  );
  export default DashboardButton