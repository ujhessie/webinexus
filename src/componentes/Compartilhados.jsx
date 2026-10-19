import { Badge } from "./ui/Badge/Badge";
import { Botao } from "./ui/Botao/Botao";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP = "https://wa.me/5598988740103";

/* CTA final compartilhado: Home, Serviços, Quem Somos e Portfólio */
export const CTAQuemSomos = () => (
    <section className='py-20 lg:py-28 bg-preto-escuro'>
        <div className='content-section'>
            <div className='relative overflow-hidden grad-cta sombra-cta rounded-3xl sm:rounded-[36px] p-8 sm:p-14 lg:p-16 text-center reveal'>
                <div className='absolute -top-16 -left-16 w-64 h-64 bg-white/15 blur-3xl rounded-full pointer-events-none' />
                <div className='absolute -bottom-20 -right-16 w-72 h-72 bg-black/25 blur-3xl rounded-full pointer-events-none' />

                <div className='relative'>
                    <Badge
                        variante='branco'
                        uppercase={false}
                        className='justify-center'
                        textoBadge='Vamos construir juntos'
                    />
                    <h2 className='text-white mb-4'>
                        Precisa de um projeto personalizado?
                    </h2>
                    <p className='text-white/85 max-w-2xl mx-auto mb-8'>
                        Conte o que você tem em mente. A gente entende o seu
                        negócio e mostra o caminho — sem enrolação e sem
                        compromisso.
                    </p>
                    <div className='flex justify-center'>
                        <Botao
                            href={WHATSAPP}
                            tipoBotao='branco'
                            target='_blank'
                            rel='noopener noreferrer'
                            iconCTA={<FaWhatsapp className='w-4 h-4' />}
                            className='w-full sm:w-auto !text-[#7b1fe1] hover:!text-[#6510c4]'
                        >
                            FALAR NO WHATSAPP
                        </Botao>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

/* Molde dos heroes internos (bg.png + scrim + brilhos) */
export const HeroInterno = ({
    badge,
    titulo,
    destaque,
    paragrafo,
    acoes,
    extras,
    brilhos = true,
}) => (
    <section className='relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 bg-[url(/bg.png)] bg-cover bg-center'>
        <div className='scrim absolute inset-0' />
        {brilhos && (
            <>
                <div className='absolute -top-24 -right-24 w-96 h-96 bg-roxo-principal/20 blur-3xl rounded-full pointer-events-none' />
                <div className='absolute -bottom-24 -left-24 w-96 h-96 bg-roxo-escuro/20 blur-3xl rounded-full pointer-events-none' />
            </>
        )}

        <div className='content-section relative'>
            <Badge textoBadge={badge} />
            <h1 className='text-4xl sm:text-5xl lg:text-7xl max-w-4xl mb-6 reveal'>
                {titulo}{" "}
                <span className='grad-texto-hero'>{destaque}</span>
            </h1>
            <p
                className='text-gray-300 max-w-2xl text-base sm:text-lg reveal'
                style={{ "--reveal-i": 1 }}
            >
                {paragrafo}
            </p>
            {acoes && (
                <div
                    className='flex flex-col sm:flex-row gap-4 mt-8 reveal'
                    style={{ "--reveal-i": 2 }}
                >
                    {acoes}
                </div>
            )}
            {extras && (
                <div className='mt-10 reveal' style={{ "--reveal-i": 3 }}>
                    {extras}
                </div>
            )}
        </div>
    </section>
);

/* Ícone de seta usado nos CTAs internos */
export const SetaCTA = () => <ArrowRight className='w-5 h-5 text-white' />;
