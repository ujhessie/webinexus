import { useState } from "react";
import { Badge } from "../../../componentes/ui/Badge/Badge";
import { Botao } from "../../../componentes/ui/Botao/Botao";
import { Marquee } from "../../../componentes/ui/Marquee/Marquee";
import { ArrowRight, Send, Clock } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { HeroInterno } from "../../../componentes/Compartilhados";

const WHATSAPP = "https://wa.me/5598988740103";
const INSTAGRAM = "https://instagram.com/webinexus";

const CANAIS = [
    {
        rotulo: "WhatsApp",
        valor: "(98) 98874-0103",
        detalhe: "Resposta em até um dia útil",
        href: WHATSAPP,
        icone: <FaWhatsapp className='w-5 h-5 text-white' />,
    },
    {
        rotulo: "Instagram",
        valor: "@webinexus",
        detalhe: "Bastidores e trabalhos novos",
        href: INSTAGRAM,
        icone: <FaInstagram className='w-5 h-5 text-white' />,
    },
];

const ASSUNTOS = [
    "Criação de site",
    "Presença no Google",
    "Sistema sob medida",
    "Design / identidade visual",
    "Outro assunto",
];

export const ContatoPage = () => {
    return (
        <>
            <HeroInterno
                badge='FALE COM A GENTE'
                titulo='Bora conversar sobre'
                destaque='o seu negócio?'
                paragrafo='Conte o que você precisa. A gente escuta, entende o seu negócio e mostra o caminho — sem enrolação, sem termo técnico e sem compromisso.'
                acoes={
                    <>
                        <Botao
                            href={WHATSAPP}
                            target='_blank'
                            rel='noopener noreferrer'
                            iconCTA={<FaWhatsapp className='w-4 h-4' />}
                        >
                            CHAMAR NO WHATSAPP
                            <ArrowRight className='w-5 h-5 text-white' />
                        </Botao>
                        <Botao
                            tipoBotao='outline'
                            href='/servicos'
                            className='border-white/20 text-white hover:bg-white/10'
                        >
                            VER NOSSOS SERVIÇOS
                        </Botao>
                    </>
                }
            />

            <Marquee>
                <li>Orçamento sem compromisso</li>
                <li>Resposta em até um dia útil</li>
                <li>Proposta clara, sem surpresa</li>
                <li>Atendimento em todo o Brasil</li>
                <li>Do problema à solução</li>
                <li>Comunicação sem termo técnico</li>
            </Marquee>

            <ContatoDireto />
            <FormContato />
            <HorarioSecao />
        </>
    );
};

const HorarioSecao = () => (
    <section className='py-20 lg:py-28 bg-preto-fosco'>
        <div className='content-section text-center max-w-2xl mx-auto'>
            <div className='reveal'>
                <Badge textoBadge='HORÁRIO' className='justify-center' />
                <h2 className='mb-4'>
                    Quando a gente <strong>responde</strong>
                </h2>
            </div>
            <div
                className='reveal flex items-center justify-center gap-4 p-6 rounded-2xl bg-preto-escuro'
                style={{ "--reveal-i": 1 }}
            >
                <span className='grad-icon w-12 h-12 rounded-xl flex items-center justify-center shrink-0'>
                    <Clock className='w-6 h-6 text-white' />
                </span>
                <p className='font-corpo text-gray-300 text-left'>
                    Segunda a sexta, das 8h às 18h. Mensagens fora desse
                    horário são respondidas no próximo dia útil — e sim, a
                    gente responde toda mensagem.
                </p>
            </div>
        </div>
    </section>
);

/* =========================================================================
   1. CONTATO DIRETO — escolha o canal
   ========================================================================= */
const ContatoDireto = () => (
    <section className='py-20 lg:py-28 bg-preto-fosco relative overflow-hidden'>
        <div className='absolute -top-24 -right-24 w-96 h-96 bg-roxo-principal/10 rounded-full blur-3xl pointer-events-none' />

        <div className='content-section relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start'>
            {/* Coluna Texto */}
            <div className='lg:col-span-5'>
                <div className='reveal'>
                    <Badge textoBadge='CONTATO DIRETO' />
                </div>
                <h2 className='mb-5 reveal' style={{ "--reveal-i": 1 }}>
                    Direto — <strong>escolha o seu canal.</strong>
                </h2>
                <p
                    className='text-gray-300 leading-relaxed mb-8 reveal'
                    style={{ "--reveal-i": 2 }}
                >
                    Prefere pular a burocracia? Chama no WhatsApp e conte o que
                    tá te atrapalhando no seu negócio. O primeiro papo é
                    gratuito e sem compromisso.
                </p>
                <div className='reveal' style={{ "--reveal-i": 3 }}>
                    <Botao
                        href={WHATSAPP}
                        target='_blank'
                        rel='noopener noreferrer'
                        iconCTA={<FaWhatsapp className='w-4 h-4' />}
                    >
                        ABRIR O WHATSAPP
                        <ArrowRight className='w-5 h-5 text-white' />
                    </Botao>
                </div>
            </div>

            {/* Coluna Canais */}
            <div className='lg:col-span-7 flex flex-col gap-4'>
                {CANAIS.map((canal, index) => (
                    <a
                        key={canal.rotulo}
                        href={canal.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='reveal button-press flex items-center gap-5 p-6 rounded-2xl bg-preto-escuro border border-white/5 hover:border-roxo-principal/50 transition-colors duration-300'
                        style={{ "--reveal-i": index }}
                    >
                        <span className='grad-icon w-12 h-12 rounded-xl flex items-center justify-center shrink-0'>
                            {canal.icone}
                        </span>
                        <span className='min-w-0'>
                            <span className='flex flex-wrap items-baseline gap-x-3'>
                                <span className='font-titulo font-semibold text-[#d28bff] text-sm'>
                                    {canal.rotulo}
                                </span>
                                <span className='tabular font-corpo text-sm text-gray-300'>
                                    {canal.valor}
                                </span>
                            </span>
                            <span className='block font-corpo text-sm text-gray-400 leading-relaxed mt-1'>
                                {canal.detalhe}
                            </span>
                        </span>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

/* =========================================================================
   2. FORMULÁRIO (monta a mensagem e envia pelo WhatsApp)
   ========================================================================= */
const FormContato = () => {
    const [form, setForm] = useState({
        nome: "",
        negocio: "",
        assunto: "",
        telefone: "",
        mensagem: "",
    });

    const [erros, setErros] = useState({});

    const atualizarCampo = (campo) => (evento) => {
        setForm({ ...form, [campo]: evento.target.value });
        if (erros[campo]) setErros({ ...erros, [campo]: undefined });
    };

    const validar = () => {
        const novosErros = {};
        if (form.nome.trim().length < 2)
            novosErros.nome = "Conta seu nome pra gente.";
        if (!form.assunto)
            novosErros.assunto = "Escolha um assunto pra gente direcionar.";
        if (form.mensagem.trim().length < 10)
            novosErros.mensagem =
                "Escreve um pouco mais sobre o que você precisa.";
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const enviarPorWhatsApp = (evento) => {
        evento.preventDefault();
        if (!validar()) return;

        const partes = [
            `Olá, Web iNexus! Meu nome é ${form.nome}.`,
            form.negocio ? `Meu negócio: ${form.negocio}.` : null,
            `Assunto: ${form.assunto}.`,
            form.telefone ? `Meu telefone: ${form.telefone}.` : null,
            "",
            form.mensagem,
        ].filter(Boolean);

        const url = `${WHATSAPP}?text=${encodeURIComponent(partes.join("\n"))}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const classeInput =
        "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 font-corpo text-sm focus:outline-none focus:border-roxo-principal transition-colors";
    const classeLabel =
        "block font-titulo text-sm text-gray-300 mb-1.5";
    const classeErro = "block font-corpo text-xs text-roxo-claro mt-2";

    return (
        <section className='py-20 lg:py-28 bg-preto-escuro'>
            <div className='content-section grid lg:grid-cols-12 gap-10 lg:gap-16 items-start'>
                {/* Coluna Texto + Dica rápida */}
                <div className='lg:col-span-5'>
                    <div className='reveal'>
                        <Badge textoBadge='CONTE O QUE VOCÊ PRECISA' />
                    </div>
                    <h2 className='mb-5 reveal' style={{ "--reveal-i": 1 }}>
                        Não sabe por onde começar?{" "}
                        <strong>Começa por aqui.</strong>
                    </h2>
                    <p
                        className='text-gray-300 leading-relaxed mb-6 reveal'
                        style={{ "--reveal-i": 2 }}
                    >
                        Escreve do jeito que der — sem enrolação. Ao enviar, a
                        mensagem abre direto no nosso WhatsApp com tudo
                        organizado. É só confirmar.
                    </p>

                    <div className='reveal p-5 rounded-2xl bg-preto-fosco border border-white/5'>
                        <h3 className='font-titulo font-bold text-sm text-[#d28bff] mb-2'>
                            Dica rápida
                        </h3>
                        <p className='font-corpo text-sm text-gray-400 leading-relaxed'>
                            Conta em uma frase o que você faz e o que te
                            atrapalha hoje. Exemplo: <em>"Tenho barbearia e
                            perco agendamento no WhatsApp."</em> Com isso já dá
                            pra te mostrar o caminho.
                        </p>
                    </div>
                </div>

                {/* Coluna Formulário */}
                <div className='lg:col-span-7 w-full p-7 sm:p-10 rounded-3xl bg-preto-fosco border border-white/5 reveal'>
                    <form
                        onSubmit={enviarPorWhatsApp}
                        noValidate
                        className='flex flex-col gap-5'
                    >
                        <div className='grid sm:grid-cols-2 gap-5'>
                            <div>
                                <label htmlFor='nome' className={classeLabel}>
                                    Seu nome *
                                </label>
                                <input
                                    id='nome'
                                    type='text'
                                    value={form.nome}
                                    onChange={atualizarCampo("nome")}
                                    placeholder='Como te chamamos?'
                                    aria-invalid={Boolean(erros.nome)}
                                    className={classeInput}
                                />
                                {erros.nome && (
                                    <span className={classeErro}>
                                        {erros.nome}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor='negocio'
                                    className={classeLabel}
                                >
                                    Seu negócio
                                </label>
                                <input
                                    id='negocio'
                                    type='text'
                                    value={form.negocio}
                                    onChange={atualizarCampo("negocio")}
                                    placeholder='Restaurante, barbearia, salão...'
                                    className={classeInput}
                                />
                            </div>
                        </div>

                        <div className='grid sm:grid-cols-2 gap-5'>
                            <div>
                                <label
                                    htmlFor='assunto'
                                    className={classeLabel}
                                >
                                    Assunto *
                                </label>
                                <select
                                    id='assunto'
                                    value={form.assunto}
                                    onChange={atualizarCampo("assunto")}
                                    aria-invalid={Boolean(erros.assunto)}
                                    className={`${classeInput} ${
                                        form.assunto
                                            ? "text-white"
                                            : "text-gray-500"
                                    }`}
                                >
                                    <option value='' disabled>
                                        Escolha um assunto
                                    </option>
                                    {ASSUNTOS.map((assunto) => (
                                        <option
                                            key={assunto}
                                            value={assunto}
                                            className='text-white bg-preto-fosco'
                                        >
                                            {assunto}
                                        </option>
                                    ))}
                                </select>
                                {erros.assunto && (
                                    <span className={classeErro}>
                                        {erros.assunto}
                                    </span>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor='telefone'
                                    className={classeLabel}
                                >
                                    Telefone
                                </label>
                                <input
                                    id='telefone'
                                    type='tel'
                                    value={form.telefone}
                                    onChange={atualizarCampo("telefone")}
                                    placeholder='(opcional)'
                                    className={classeInput}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='mensagem'
                                className={classeLabel}
                            >
                                O que você precisa? *
                            </label>
                            <textarea
                                id='mensagem'
                                rows={5}
                                value={form.mensagem}
                                onChange={atualizarCampo("mensagem")}
                                placeholder='Conta o que tá te atrapalhando e o que você quer resolver.'
                                aria-invalid={Boolean(erros.mensagem)}
                                className={`${classeInput} resize-y`}
                            />
                            {erros.mensagem && (
                                <span className={classeErro}>
                                    {erros.mensagem}
                                </span>
                            )}
                        </div>

                        <button
                            type='submit'
                            className='button-press sombra-btn grad-btn inline-flex items-center justify-center gap-3 px-6 py-3.5 font-titulo font-bold text-sm tracking-wider uppercase rounded-2xl hover:-translate-y-0.5 w-full sm:w-auto self-start'
                        >
                            <FaWhatsapp className='w-5 h-5 text-white shrink-0' />
                            <span>ENVIAR PELO WHATSAPP</span>
                            <Send className='w-4 h-4' />
                        </button>

                        <p className='font-corpo text-xs text-gray-500'>
                            Ao enviar, você é redirecionado pro WhatsApp —
                            nada é enviado automaticamente.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

