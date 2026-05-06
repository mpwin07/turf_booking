export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#0A0A0A",
        line: "#FFD500",
        danger: "#FF3B30",
        turf: "#18b46b"
      },
      fontFamily: {
        display: ["Arial Black", "Impact", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 26px rgba(255, 213, 0, 0.35)",
        redglow: "0 0 20px rgba(255, 59, 48, 0.25)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        shimmer: "shimmer 3.5s linear infinite"
      }
    }
  },
  plugins: []
};
