interface ButtonProps {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", onClick, children }: ButtonProps) => {
  const bgColor = variant === "primary" ? "bg-[#AD1FEA]" : "bg-[#4661E6]";

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
