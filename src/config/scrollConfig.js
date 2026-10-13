/**
 * Configuração oficial do efeito de atraso e suavização de rolagem (Smooth Inertia Scroll)
 *
 * Edite os valores abaixo para ajustar ou desativar o efeito:
 */
export const SCROLL_CONFIG = {
    /**
     * true  = Efeito de atraso/suavização ativado
     * false = Efeito desativado (rolagem nativa padrão do navegador)
     */
    ativo: true,

    /**
     * Intensidade do atraso / inércia (fator de interpolação LERP):
     * Valores recomendados entre 0.04 e 0.15:
     * - 0.04 a 0.06: Mais atraso, sensação premium e flutuante
     * - 0.08       : Equilíbrio perfeito entre fluidez e precisão (Recomendado)
     * - 0.12 a 0.15: Resposta mais rápida e próxima do scroll nativo
     */
    intensidade: 0.08,

    /**
     * Multiplicador de sensibilidade da roda do mouse:
     * - 1.0: Velocidade padrão natural
     * - 1.2: Rola uma distância maior a cada giro do mouse
     * - 0.8: Rola uma distância menor a cada giro do mouse
     */
    sensibilidade: 1.0,
};

