import * as React from "react";

function BackPage(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="20px" width="20px" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M244 400L100 256l144-144M120 256h292"
      />
    </svg>
  );
}

export default BackPage;
