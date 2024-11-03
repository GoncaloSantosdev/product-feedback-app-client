type Input = {
  inputTitle: string;
  inputDesc: string;
  children: React.ReactNode;
  containerStyles?: string;
};

const FormField = ({
  inputTitle,
  inputDesc,
  children,
  containerStyles,
}: Input) => {
  return (
    <div className={containerStyles}>
      <p className="text-[#3A4374] font-bold">{inputTitle}</p>
      <span className="text-[#647196] text-sm mt-2">{inputDesc}</span>
      {children}
    </div>
  );
};

export default FormField;
