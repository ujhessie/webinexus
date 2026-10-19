import { Badge } from "../../../componentes/ui/Badge/Badge";
import { Botao } from "../../../componentes/ui/Botao/Botao";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import {
    HeroInterno,
    CTAQuemSomos,
} from "../../../componentes/Compartilhados";

const WHATSAPP = "https://wa.me/5598988740103";
const INSTAGRAM = "https://instagram.com/webinexus";

const VALORES = [
    {
        titulo: "Clareza",
        texto: "Você entende cada etapa e cada linha do orçamento. Sem termo técnico difícil e sem surpresa no fim.",
    },
    {
        titulo: "Personalização",
        texto: "Nada de template genérico. Cada projeto nasce a partir do seu negócio, do seu público e do seu jeito de trabalhar.",
    },
    {
        titulo: "Compromisso",
        texto: "Prazo combinado é prazo cumprido. E o suporte não acaba na entrega — a gente fica por perto.",
    },
];

const HITOS = [
    { valor: "+5 anos", rotulo: "criando soluções digitais" },
    { valor: "+100%", rotulo: "projetos entregues sob medida" },
    { valor: "24h", rotulo: "para você ter uma resposta" },
];

export const QuemSomosPage = () => (
    <>
        <HeroInterno
            badge='QUEM SOMOS'
            titulo='A Web iNexus nasceu para'
            destaque='traduzir tecnologia em resultado.'
            paragrafo='Somos uma agência de soluções digitais para pequenos negócios. Estratégia, design e código no mesmo lugar — falando a sua língua, do primeiro papo à entrega.'
            acoes={
                <>
                    <Botao
                        href={WHATSAPP}
                        target='_blank'
                        rel='noopener noreferrer'
                        iconCTA={<FaWhatsapp className='w-4 h-4' />}
                    >
                        FALE COM A GENTE
                        <ArrowRight className='w-5 h-5 text-white' />
                    </Botao>
                    <Botao
                        tipoBotao='outline'
                        href='/portfolio'
                        className='border-white/20 text-white hover:bg-white/10'
                    >
                        VER NOSSOS TRABALHOS
                    </Botao>
                </>
            }
        />

        {/* Nossa história */}
        <section className='py-20 lg:py-28 bg-preto-fosco'>
            <div className='content-section grid lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
                <div className='reveal'>
                    <Badge textoBadge='NOSSA HISTÓRIA' />
                    <h2 className='mb-5'>
                        De um sonho de quem vive de <strong>tecnologia</strong>{" "}
                        para um negócio que resolve.
                    </h2>
                    <p className='text-gray-300 leading-relaxed mb-4'>
                        A Web iNexus começou com uma convicção simples: pequeno
                        negócio também merece solução boa. A maioria dos
                        empreendedores locais recebe um site genérico, caro, que
                        não representa o seu trabalho e que ninguém atualiza
                        depois da entrega.
                    </p>
                    <p className='text-gray-300 leading-relaxed'>
                        Nós fazemos diferente. A gente senta, escuta o problema,
                        entende o negócio e só então constrói. O resultado é uma
                        solução que faz sentido para quem usa — o seu cliente —
                        e para quem vive dela — você.
                    </p>
                </div>

                <div className='grid sm:grid-cols-3 gap-4'>
                    {HITOS.map(({ valor, rotulo }, i) => (
                        <div
                            key={valor}
                            className='reveal p-6 rounded-2xl bg-preto-escuro text-center hover:bg-[#101120] transition-colors duration-300'
                            style={{ "--reveal-i": i }}
                        >
                            <span className='tabular block font-titulo font-bold text-2xl sm:text-3xl grad-texto-metrica mb-2'>
                                {valor}
                            </span>
                            <span className='text-sm text-gray-300'>
                                {rotulo}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Valores */}
        <section className='py-20 lg:py-28 bg-preto-escuro'>
            <div className='content-section'>
                <div className='text-center max-w-2xl mx-auto reveal'>
                    <Badge
                        textoBadge='NOSSOS VALORES'
                        className='justify-center'
                    />
                    <h2>
                        O que não <strong>negociamos</strong>
                    </h2>
                </div>

                <div className='grid sm:grid-cols-3 gap-5 mt-10'>
                    {VALORES.map(({ titulo, texto }, i) => (
                        <div
                            key={titulo}
                            className='reveal p-7 rounded-2xl bg-preto-fosco hover:-translate-y-1 transition-[transform,background-color] duration-300 hover:bg-[#1c1d2e]'
                            style={{ "--reveal-i": i }}
                        >
                            <h3 className='font-titulo font-bold text-lg text-[#d28bff] mb-3'>
                                {titulo}
                            </h3>
                            <p className='text-gray-300 leading-relaxed'>
                                {texto}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Convite */}
        <section className='py-20 lg:py-28 bg-preto-fosco'>
            <div className='content-section text-center max-w-2xl mx-auto'>
                <div className='reveal'>
                    <Badge
                        textoBadge='VAMOS CONVERSAR'
                        className='justify-center'
                    />
                    <h2 className='mb-4'>
                        Quer conhecer a gente <strong>de perto?</strong>
                    </h2>
                    <p className='text-gray-400 mb-8'>
                        O melhor jeito é chamar no WhatsApp ou acompanhar o
                        nosso dia a dia no Instagram. Sem apresentação formal —
                        só gente querendo resolver o seu problema.
                    </p>
                </div>
                <div className='flex flex-wrap justify-center gap-4 reveal'>
                    <Botao
                        href={WHATSAPP}
                        target='_blank'
                        rel='noopener noreferrer'
                        iconCTA={<FaWhatsapp className='w-4 h-4' />}
                    >
                        CHAMAR NO WHATSAPP
                    </Botao>
                    <Botao
                        tipoBotao='secundario'
                        href={INSTAGRAM}
                        target='_blank'
                        rel='noopener noreferrer'
                        iconCTA={<FaInstagram className='w-4 h-4' />}
                    >
                        SEGUIR NO INSTAGRAM
                    </Botao>
                </div>
            </div>
        </section>

        <CTAQuemSomos />
    </>
);
