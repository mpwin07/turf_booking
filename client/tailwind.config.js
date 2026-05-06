export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#F8F5ED",
        line: "#FFD500",
        danger: "#FF3B30",
        turf: "#18b46b"
      },
      fontFamily: {
        display: ["Arial Black", "Impact", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        neon: "0 18px 55px rgba(255, 213, 0, 0.18)",
        redglow: "0 18px 44px rgba(255, 59, 48, 0.14)",
        premium: "0 22px 70px rgba(0, 0, 0, 0.34)"
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
