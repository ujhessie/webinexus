/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {

            colors: {
                "roxo-pricipal": "#5D45FD",
                "roxo-claro": "#A89CFF",
                "roxo-escuro": "#1A1728",
                "cinza": "#969799",

               
                "branco": "#FFFFFF",
                "branco-claro": "#F5F5F5",
                "preto": "#000000",
                "prpeto-fosco": "#161616"

               

            },
            fontFamily: {
                'titulo': ["Familjen Grotesk", "sans-seri"],  // Fonte para títulos
                'corpo': ['Inter', 'sans-serif'],        // Fonte para o corpo do texto
                'monoespaco': ['Familjen Grotesk', 'monospace'], // Outra opção de fonte
            },
            // Adicionando gradientes personalizados
            backgroundImage: {
                'gradient-principal': 'linear-gradient(45deg, #A89CFF, #5D45FD)',

            },
        },
        breakpoints: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1400px",
        },
    },
    plugins: [],
};
