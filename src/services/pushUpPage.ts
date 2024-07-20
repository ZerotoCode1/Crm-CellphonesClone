import { GlobalPushUpConfirmRef } from "@/components/global/push-up";
import React from "react";

class PushUpService {
  static instance: React.MutableRefObject<GlobalPushUpConfirmRef>;
}

export default PushUpService;
