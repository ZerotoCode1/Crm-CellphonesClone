import { GlobalLoadingPage } from "@/components/global/loading";
import React from "react";
class LoadingPageService {
  static instance: React.MutableRefObject<GlobalLoadingPage>;
}

export default LoadingPageService;
