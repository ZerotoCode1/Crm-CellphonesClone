import * as React from "react";

function Add(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" height="20px" width="20px" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M256 112v288M400 256H112" />
    </svg>
  );
}

export default Add;
