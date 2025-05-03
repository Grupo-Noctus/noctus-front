import { createNotivue } from "notivue";

import "notivue/notification.css";
import "notivue/animations.css";
import "notivue/notification-progress.css";

export const notivue = createNotivue({
    pauseOnHover: true,
    pauseOnTouch: true,
    pauseOnTabChange: true,
    enqueue: false,
    avoidDuplicates: false,
    position: "top-right",
    teleportTo: "body",
    limit: Infinity,
    animations: {
        enter: "Notivue__enter",
        leave: "Notivue__leave",
        clearAll: "Notivue__clearAll",
    },
    transition: "transform 0.35s cubic-bezier(0.5, 1, 0.25, 1)",
});
