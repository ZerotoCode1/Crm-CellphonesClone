import { colors } from "@/colors";
import { IColors } from "@/interfaces/common";

const User = (props: Omit<React.SVGProps<SVGSVGElement> & IColors, "icon">) => {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      xmlns="http://www.w3.org/2000/svg"
      fill={props?.color || colors.gray.main}
      className="icon-sidebar"
      {...props}
    >
      <path d="M7 8C9.20938 8 11 6.20937 11 4C11 1.79063 9.20938 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8813 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8813 12.1187 9 9.8 9Z" />
    </svg>
  );
};

export default User;
