interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

const Button = ({ variant = "primary", children }: ButtonProps) => {
  const bgColor = variant === "primary" ? "bg-[#AD1FEA]" : "bg-[#4661E6]";

  return (
    <button
      className={`${bgColor} text-white px-5 py-3 rounded-lg hover:opacity-90 font-bold text-sm`}
    >
      {children}
    </button>
  );
};

export default Button;
