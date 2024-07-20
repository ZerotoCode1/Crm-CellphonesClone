import { GlobalPopupConfirmRef } from "@/components/global/popup";
import React from "react";

class PopupService {
  static instance: React.MutableRefObject<GlobalPopupConfirmRef>;
}

export default PopupService;
