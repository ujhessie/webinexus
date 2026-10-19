import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Rola para o topo ao trocar de rota */
export const ScrollTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
};

/* Revela os elementos .reveal quando entram na tela (uma vez) */
export const RevealObserver = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const alvos = document.querySelectorAll(".reveal");
        const prefereReduzir = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefereReduzir || !("IntersectionObserver" in window)) {
            alvos.forEach((alvo) => alvo.classList.add("is-in"));
            return;
        }

        const observer = new IntersectionObserver(
            (entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("is-in");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        alvos.forEach((alvo) => observer.observe(alvo));

        return () => observer.disconnect();
    }, [pathname]);

    return null;
};
