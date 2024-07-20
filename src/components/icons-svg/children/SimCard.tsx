import { IColors } from "@/interfaces/common";

const SimCard = (props: Omit<React.SVGProps<SVGSVGElement> & IColors, "icon">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props} height={18} width={18}>
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 6.5v2m3-2v2m3-2v2M8.2 3h5.262c.565 0 .847 0 1.108.072a2 2 0 0 1 .643.309c.219.158.395.379.748.82l2.338 2.922c.26.325.39.488.482.669.082.16.142.33.178.507.041.2.041.407.041.824V17.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C17.48 21 16.92 21 15.8 21H8.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C5 19.48 5 18.92 5 17.8V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C6.52 3 7.08 3 8.2 3Z"
      />
    </svg>
  );
};

export default SimCard;
