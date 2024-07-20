import * as React from "react";

function Import(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M21 14a1 1 0 00-1 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 00-2 0v4a3 3 0 003 3h14a3 3 0 003-3v-4a1 1 0 00-1-1zm-9.71 1.71a1 1 0 00.33.21.94.94 0 00.76 0 1 1 0 00.33-.21l4-4a1 1 0 00-1.42-1.42L13 12.59V3a1 1 0 00-2 0v9.59l-2.29-2.3a1 1 0 10-1.42 1.42z" />
    </svg>
  );
}

export default Import;
