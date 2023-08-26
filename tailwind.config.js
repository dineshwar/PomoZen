import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "synthwave",
      {
        pomodoro: {
          "primary": "#78eddb",
          "secondary": "#0c3d7c",
          "accent": "#d6005c",
          "neutral": "#362938",
          "base-100": "#33293d",
          "info": "#48bbf4",
          "success": "#24a899",
          "warning": "#f1b037",
          "error": "#f56751",
        },
      },
    ],
  },
};
