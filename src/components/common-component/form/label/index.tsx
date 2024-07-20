export interface ILabel {
  title?: string | React.ReactNode;
  required?: boolean;

  htmlFor?: string;
  className?: string;
}

const Label = (props: ILabel) => {
  const { title, required, htmlFor, className } = props;
  return (
    <>
      {title && (
        <label className={` font-medium text-[14px] cursor-pointer mb-1 text-[#000] flex leading-[15px] ${className}`} htmlFor={htmlFor}>
          {title} {required ? <Asterisk /> : ""}
        </label>
      )}
    </>
  );
};

export default Label;

const Asterisk = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-asterisk"
      style={{ marginLeft: "4px", marginTop: "6px" }}
    >
      <path d="M12 6v12" />
      <path d="M17.196 9 6.804 15" />
      <path d="m6.804 9 10.392 6" />
    </svg>
  );
};
