import { Badge } from "../../../componentes/ui/Badge/Badge";
import { Botao } from "../../../componentes/ui/Botao/Botao";
import { Marquee } from "../../../componentes/ui/Marquee/Marquee";
import {
    MonitorSmartphone,
    Search,
    Settings2,
    Palette,
    CheckCircle2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { HeroInterno, CTAQuemSomos } from "../../../componentes/Compartilhados";

const WHATSAPP = "https://wa.me/5598988740103";

const SERVICOS = [
    {
        id: "criacao-de-sites",
        num: "01", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: MonitorSmartphone,
        titulo: "Criação de Sites",
        texto: "O site é a sua vitrine aberta 24 horas. A gente constrói um site profissional que mostra quem você é, o que você oferece e facilita o cliente a te chamar — tudo no celular ou no computador.",
        itens: [
            "Site feito sob medida para o seu negócio",
            "Perfeito no celular, tablet e computador",
            "Botão de WhatsApp direto no site",
            "Páginas essenciais: início, serviços, sobre e contato",
            "Rápido, seguro e fácil de encontrar no Google",
        ],
        idealPara:
            "Restaurantes, barbearias, salões, clínicas e qualquer negócio que ainda não tem presença profissional na internet.",
    },
    {
        id: "presenca-no-google",
        num: "02", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: Search,
        titulo: "Presença no Google",
        texto: "Hoje, quando alguém procura um serviço perto de casa, a decisão acontece no Google. A gente coloca o seu negócio nesse resultado — com informação certa, foto boa e localização atualizada.",
        itens: [
            "Cadastro no Google Meu Negócio",
            "Aparecer nas buscas da sua região",
            "Fotos, horários e localização sempre atualizados",
            "Orientação para gerenciar avaliações de clientes",
            "Site integrado à sua presença no Google",
        ],
        idealPara:
            "Negócios locais que dependem de clientes da região e querem aparecer antes do concorrente.",
    },
    {
        id: "sistemas-sob-medida",
        num: "03", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: Settings2,
        titulo: "Sistemas sob Medida",
        texto: "Planilha lotada, agenda de papel e mensagem perdida no WhatsApp custam tempo e dinheiro. A gente desenvolve ferramentas que organizam a sua rotina do jeito que o seu negócio funciona.",
        itens: [
            "Agendamentos e reservas online",
            "Pedidos pelo site integrados ao WhatsApp",
            "Painel para gerenciar tudo em um lugar só",
            "Automação de tarefas repetitivas",
            "Integração com WhatsApp e outras ferramentas",
        ],
        idealPara:
            "Quem já cresceu o suficiente para a bagunça começar a atrapalhar o atendimento.",
    },
    {
        id: "design",
        num: "04", // taste-skill-ignore: numeração de etapa 01–04 é parte do design original
        icone: Palette,
        titulo: "Design",
        texto: "Antes do cliente te conhecer, ele te vê. A gente cuida da aparência da sua marca — do logo às peças do dia a dia — para passar a imagem de negócio sério e profissional.",
        itens: [
            "Identidade visual completa (logo, cores, fontes)",
            "Peças para redes sociais",
            "Cardápios, flyers e materiais digitais",
            "Padrão visual aplicado em todos os pontos de contato",
        ],
        idealPara:
            "Negócios que já têm clientela, mas ainda não têm uma cara profissional na marca.",
    },
];

const ArtigoServico = ({ servico, invertido }) => {
    const Icone = servico.icone;

    return (
        <article
            id={servico.id}
            className={`grid lg:grid-cols-2 gap-10 lg:gap-16 py-14 lg:py-20 ${
                invertido ? "lg:[&>*:first-child]:order-2" : ""
            }`}
        >
            {/* Texto */}
            <div>
                <div className='flex items-start gap-4 mb-5'>
                    <span className='tabular font-black text-3xl text-roxo-principal/40'>
                        {servico.num}
                    </span>
                    <h2 className='text-2xl sm:text-3xl'>{servico.titulo}</h2>
                </div>

                <p className='text-gray-400 leading-relaxed mb-6'>
                    {servico.texto}
                </p>

                <ul className='space-y-3 mb-6'>
                    {servico.itens.map((item) => (
                        <li
                            key={item}
                            className='flex items-start gap-3 text-base text-gray-300'
                        >
                            <CheckCircle2 className='w-4 h-4 shrink-0 mt-0.5 text-roxo-claro' />
                            {item}
                        </li>
                    ))}
                </ul>

                <p className='text-sm text-gray-400 pl-4'>
                    <strong className='text-gray-400'>Ideal para:</strong>{" "}
                    {servico.idealPara}
                </p>
            </div>

            {/* Painel visual */}
            <div className='relative overflow-hidden rounded-3xl bg-preto-fosco min-h-72 sm:min-h-96 flex items-center justify-center'>
                <div className='absolute -bottom-10 -right-10 w-48 h-48 bg-roxo-principal/15 blur-3xl rounded-full' />
                <span className='absolute bottom-3 right-5 font-black text-[9rem] leading-none text-white/[0.03] select-none tabular'>
                    {servico.num}
                </span>
                <span
                    className='relative w-20 h-20 rounded-2xl grad-icon shadow-[0_10px_30px_-8px_rgba(123,31,225,0.6)] flex items-center justify-center transition-transform duration-300 hover:scale-105' /* taste-skill-ignore: brilho roxo no ícone do serviço */
                >
                    <Icone className='w-10 h-10 text-white' />
                </span>
            </div>
        </article>
    );
};

export const ServicosPage = () => (
    <>
        <HeroInterno
            badge='NOSSOS SERVIÇOS'
            titulo='Tudo que o seu negócio precisa para'
            destaque='existir online.'
            paragrafo='Do site ao sistema, do Google ao design. Você conta o problema do seu negócio, a gente monta a solução — sem enrolação e sem termo técnico difícil.'
            acoes={
                <>
                    <Botao
                        href={WHATSAPP}
                        target='_blank'
                        rel='noopener noreferrer'
                        iconCTA={<FaWhatsapp className='w-4 h-4' />}
                    >
                        QUERO UM ORÇAMENTO
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

        <Marquee>
            <li>Sites profissionais</li>
            <li>Landing pages</li>
            <li>Google Meu Negócio</li>
            <li>Agendamentos online</li>
            <li>Sistemas sob medida</li>
            <li>Identidade visual</li>
            <li>Automações</li>
            <li>Suporte contínuo</li>
        </Marquee>

        <section className='py-14 lg:py-20 bg-preto-escuro'>
            <div className='content-section'>
                <div className='max-w-3xl reveal'>
                    <Badge textoBadge='O QUE FAZEMOS' />
                    <h2>
                        Cada serviço resolve um <strong>problema real</strong>
                    </h2>
                </div>

                <div>
                    {SERVICOS.map((servico, i) => (
                        <div key={servico.id} className='reveal'>
                            <ArtigoServico
                                servico={servico}
                                invertido={i % 2 !== 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <CTAQuemSomos />
    </>
);
