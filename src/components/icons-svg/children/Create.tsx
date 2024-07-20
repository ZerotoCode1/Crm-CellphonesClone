import * as React from "react";

function Create(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="#fff"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M256 112v288M400 256H112"
      />
    </svg>
  );
}

export default Create;
