import * as React from "react";

function LayoutSidebar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="gray" viewBox="0 0 16 16" height="20" width="20" {...props}>
      <path d="M0 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm5-1v12h9a1 1 0 001-1V3a1 1 0 00-1-1H5zM4 2H2a1 1 0 00-1 1v10a1 1 0 001 1h2V2z" />
    </svg>
  );
}

export default LayoutSidebar;
