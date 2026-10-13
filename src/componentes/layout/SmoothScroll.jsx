import { useEffect, useRef } from "react";
import { SCROLL_CONFIG } from "../../config/scrollConfig";

/**
 * Hook para controle de rolagem suave com atraso / inércia (Smooth Inertia Scroll)
 *
 * @param {Object} opcoes
 * @param {boolean} [opcoes.ativo] - Ativa ou desativa o efeito
 * @param {number} [opcoes.intensidade] - Fator de interpolação (0.04 a 0.15)
 * @param {number} [opcoes.sensibilidade] - Multiplicador de velocidade
 */
export const useSmoothScroll = (opcoes = {}) => {
    const configAtivo = opcoes.ativo ?? SCROLL_CONFIG.ativo;
    const configIntensidade = opcoes.intensidade ?? SCROLL_CONFIG.intensidade;
    const configSensibilidade =
        opcoes.sensibilidade ?? SCROLL_CONFIG.sensibilidade;

    const targetYRef = useRef(0);
    const currentYRef = useRef(0);
    const animacaoIdRef = useRef(null);
    const executandoRef = useRef(false);

    useEffect(() => {
        let ativo = configAtivo;
        let intensidade = configIntensidade;
        let sensibilidade = configSensibilidade;

        const lerConfiguracaoLocal = () => {
            try {
                const salvoAtivo = localStorage.getItem("scroll_ativo");
                const salvoIntensidade = localStorage.getItem(
                    "scroll_intensidade"
                );
                if (salvoAtivo !== null) ativo = salvoAtivo === "true";
                if (salvoIntensidade !== null)
                    intensidade = parseFloat(salvoIntensidade);
            } catch {
                // Ignore storage error
            }
        };

        lerConfiguracaoLocal();

        if (!ativo) {
            if (animacaoIdRef.current)
                cancelAnimationFrame(animacaoIdRef.current);
            executandoRef.current = false;
            return;
        }

        const prefereReduzido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (prefereReduzido) return;

        targetYRef.current = window.scrollY;
        currentYRef.current = window.scrollY;

        const obterMaxScroll = () => {
            return Math.max(
                0,
                document.documentElement.scrollHeight - window.innerHeight
            );
        };

        const normalizarDelta = (e) => {
            let delta = e.deltaY;
            if (e.deltaMode === 1) {
                delta *= 36;
            } else if (e.deltaMode === 2) {
                delta *= window.innerHeight;
            }
            return delta;
        };

        const atualizarScroll = () => {
            const diferenca = targetYRef.current - currentYRef.current;
            currentYRef.current += diferenca * intensidade;

            window.scrollTo(0, Math.round(currentYRef.current * 100) / 100);

            if (Math.abs(diferenca) > 0.5) {
                animacaoIdRef.current = requestAnimationFrame(atualizarScroll);
            } else {
                currentYRef.current = targetYRef.current;
                window.scrollTo(0, currentYRef.current);
                executandoRef.current = false;
            }
        };

        const lidarRodaMouse = (e) => {
            if (e.ctrlKey) return;

            // Ignora se estiver dentro de elementos roláveis internos (modais, caixas de código, etc)
            let elemento = e.target;
            while (
                elemento &&
                elemento !== document.body &&
                elemento !== document.documentElement
            ) {
                const estilo = window.getComputedStyle(elemento);
                if (
                    (estilo.overflowY === "auto" ||
                        estilo.overflowY === "scroll") &&
                    elemento.scrollHeight > elemento.clientHeight
                ) {
                    return;
                }
                elemento = elemento.parentElement;
            }

            e.preventDefault();

            const delta = normalizarDelta(e);
            const maxScroll = obterMaxScroll();

            targetYRef.current = Math.max(
                0,
                Math.min(maxScroll, targetYRef.current + delta * sensibilidade)
            );

            if (!executandoRef.current) {
                executandoRef.current = true;
                animacaoIdRef.current = requestAnimationFrame(atualizarScroll);
            }
        };

        const lidarScrollNativo = () => {
            if (!executandoRef.current) {
                targetYRef.current = window.scrollY;
                currentYRef.current = window.scrollY;
            }
        };

        const lidarMudancaConfig = () => {
            lerConfiguracaoLocal();
        };

        window.addEventListener("wheel", lidarRodaMouse, { passive: false });
        window.addEventListener("scroll", lidarScrollNativo, { passive: true });
        window.addEventListener("scrollConfigChanged", lidarMudancaConfig);

        return () => {
            window.removeEventListener("wheel", lidarRodaMouse);
            window.removeEventListener("scroll", lidarScrollNativo);
            window.removeEventListener("scrollConfigChanged", lidarMudancaConfig);
            if (animacaoIdRef.current)
                cancelAnimationFrame(animacaoIdRef.current);
            executandoRef.current = false;
        };
    }, [configAtivo, configIntensidade, configSensibilidade]);
};

/**
 * Componente declarativo para ativação do efeito de rolagem suave com atraso
 */
export const SmoothScroll = (props) => {
    useSmoothScroll(props);
    return null;
};

