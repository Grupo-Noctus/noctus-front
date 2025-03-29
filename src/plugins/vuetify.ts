import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import 'vuetify/styles';
import '@/assets/styles.css';


export const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "light",
        themes: {
            light: {
                colors: {
                    primary: "#461CDC",
                    secondary: "#FFFFFF",
                    accent: "#6FF24B",
                    error: "#4839DB",
                    info: "#2196F3",
                    success: "#6FF24B",
                    warning: "#461CDC",
                    anchor: "#482E8F",
                },
            },
            dark: {
                colors: {
                    primary: "#461CDC",
                    secondary: "#010326",
                    accent: "#6FF24B",
                    error: "#FFFFFF",
                    info: "#6FF24B",
                    success: "#010326",
                    warning: "#FFFFFF",
                },
            },
        },
    },
});
