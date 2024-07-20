export const classCommon = {
  navTop: "nav-top",
  header: "header",
};

export const indexElement = {
  loading: 101,
  popup: 102,
  header: 100,
  overlay: 100,
  layoutTop: 10,
  layoutContent: 20,
  pushUp: 103,
};

export const device = () => {
  const width = screen.width;

  return {
    isMobile: width < 768,
    isTablet: width > 1024,
    isDesktop: width > 1200,
  };
};

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 768,
  lg: 984,
  xl: 1240,
};
export const menuSidebar = {
  menuSidebarBig: "120px",
  menuSidebarSmall: "260px",
};

export const SUCCESS = "success";
