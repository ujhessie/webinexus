/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        roxo: {
          principal: "#7B1FE1",
          secundario: "#B62DFE",
          hoverPrincipal: "#8B2CF5",
          hoverSecundario: "#C446FE",
        },
        fundo: "#06010d",
        texto: {
          corpo: "#cbd5e1",
          suave: "#94a3b8",
          selo: "#d8b4fe",
        },
        borda: {
          selo: "rgba(182, 45, 254, 0.45)",
        },
      },
      fontFamily: {
        titulo: ['"Space Grotesk"', "sans-serif"],
        corpo: ['"Poppins"', "sans-serif"],
      },
      boxShadow: {
        "glow-selo": "0 0 20px rgba(182, 45, 254, 0.25)",
        "glow-selo-hover": "0 0 28px rgba(182, 45, 254, 0.45)",
        "glow-botao":
          "0 10px 32px -4px rgba(123, 31, 225, 0.7), 0 0 24px rgba(182, 45, 254, 0.45)",
        "glow-botao-hover":
          "0 16px 40px -4px rgba(123, 31, 225, 0.85), 0 0 32px rgba(182, 45, 254, 0.65)",
        "glow-pilula": "0 4px 18px rgba(123, 31, 225, 0.5)",
      },
      backgroundImage: {
        "gradiente-marca": "linear-gradient(135deg, #7B1FE1 0%, #B62DFE 100%)",
        "gradiente-botao": "linear-gradient(90deg, #7B1FE1 0%, #B62DFE 100%)",
        "gradiente-botao-hover":
          "linear-gradient(90deg, #8B2CF5 0%, #C446FE 100%)",
        "gradiente-selo": "rgba(123, 31, 225, 0.16)",
      },
      maxWidth: {
        conteiner: "1600px",
      },
    },
  },
  plugins: [],
};
