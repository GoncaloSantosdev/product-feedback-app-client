interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "warning"; // Added "warning" variant
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", onClick, children }: ButtonProps) => {
  const bgColor =
    variant === "primary"
      ? "bg-[#AD1FEA]"
      : variant === "secondary"
      ? "bg-[#4661E6]"
      : variant === "danger"
      ? "bg-[#D73737]"
      : variant === "warning"
      ? "bg-[#3A4374]"
      : "bg-[#AD1FEA]";

  return (
    <button
      onClick={onClick}
      className={`${bgColor} text-white px-5 py-3 rounded-lg hover:opacity-90 font-bold text-sm cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
