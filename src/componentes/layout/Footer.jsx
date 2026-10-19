import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Footer = ({
    logo = "/logo.png",
    tagline = "Soluções para quem quer evoluir",
    copyright = "Direitos Reservados a Web iNexus",
    linksNavegacao = [
        { texto: "Página Inicial", href: "/" },
        { texto: "Serviços", href: "/servicos" },
        { texto: "Quem Somos", href: "/quem-somos" },
        { texto: "Portfólio", href: "/portfolio" },
        { texto: "Contato", href: "/contato" },
    ],
    solucoes = [
        { texto: "Landingpages", href: "#" },
        { texto: "Sistemas Web", href: "#" },
        { texto: "E-commerces", href: "#" },
        { texto: "Artes digitais", href: "#" },
        { texto: "Social Media", href: "#" },
    ],
    linksLegais = [
        { texto: "Política de Privacidade", href: "/politica-de-privacidade" },
        { texto: "Termos de uso", href: "/termos-de-uso" },
        { texto: "Cookies", href: "/cookies" },
    ],
    redesSociais = [
        {
            nome: "Instagram",
            href: "https://instagram.com",
            icone: <FaInstagram className='w-5 h-5 text-black' />,
        },
        {
            nome: "Instagram",
            href: "https://instagram.com",
            icone: <FaInstagram className='w-5 h-5 text-black' />,
        },
        {
            nome: "Instagram",
            href: "https://instagram.com",
            icone: <FaInstagram className='w-5 h-5 text-black' />,
        },
        {
            nome: "Instagram",
            href: "https://instagram.com",
            icone: <FaInstagram className='w-5 h-5 text-black' />,
        },
    ],
    contato = {
        whatsapp: "https://wa.me/5598988740103",
        telefone: "WhatsApp · (98) 98874-0103",
        nota: "Atendimento em todo o Brasil",
    },
}) => {
    return (
        <footer className='w-full bg-preto-escuro py-16 sm:py-20 text-white'>
            <div className='content-section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10'>
                {/* Coluna 1: Marca, contato rápido e copyright */}
                <div className='sm:col-span-2 md:col-span-1'>
                    <Link to='/' aria-label='Web iNexus — página inicial'>
                        <img
                            src={logo}
                            alt='Web iNexus'
                            className='h-7 sm:h-8 w-auto object-contain mb-4'
                        />
                    </Link>
                    <p className='text-base text-neutral-300 font-corpo leading-relaxed'>
                        {tagline}
                    </p>

                    <a
                        href={contato.whatsapp}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='button-press flex items-center gap-2 font-titulo font-semibold text-sm text-white hover:text-roxo-claro transition-colors mt-5'
                    >
                        <FaWhatsapp className='w-4 h-4' />
                        {contato.telefone}
                    </a>
                    <p className='text-sm text-neutral-400 font-corpo mt-1'>
                        {contato.nota}
                    </p>

                    <p className='text-sm text-neutral-400 font-corpo mt-3'>
                        {copyright}
                    </p>
                </div>

                {/* Coluna 2: Navegação */}
                <div>
                    <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4'>
                        Navegação
                    </h4>
                    <ul className='space-y-2'>
                        {linksNavegacao.map((item, index) => (
                            <li key={index}>
                                <LinkFooter href={item.href}>
                                    {item.texto}
                                </LinkFooter>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Coluna 3: Soluções */}
                <div>
                    <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4'>
                        Soluções
                    </h4>
                    <ul className='space-y-2'>
                        {solucoes.map((item, index) => (
                            <li key={index}>
                                <LinkFooter href={item.href}>
                                    {item.texto}
                                </LinkFooter>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Coluna 4: Legal */}
                <div>
                    <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4'>
                        Legal
                    </h4>
                    <ul className='space-y-2'>
                        {linksLegais.map((item, index) => (
                            <li key={index}>
                                <LinkFooter href={item.href}>
                                    {item.texto}
                                </LinkFooter>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Coluna 5: Redes Sociais */}
                <div>
                    <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4'>
                        Redes Sociais
                    </h4>
                    <div className='flex items-center gap-3 flex-wrap'>
                        {redesSociais.map((rede, index) => (
                            <a
                                key={index}
                                href={rede.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                aria-label={
                                    rede.nome || `Rede social ${index + 1}`
                                }
                                className='button-press w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-neutral-200 hover:scale-105 transition-[background-color,transform] shrink-0'
                            >
                                {rede.icone}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const LinkFooter = ({ href, children }) => {
    const ehInterno = href.startsWith("/") && !href.startsWith("//");
    const classe =
        "text-sm text-neutral-400 hover:text-white transition-colors block py-1 font-corpo";

    if (ehInterno) {
        return (
            <Link to={href} className={classe}>
                {children}
            </Link>
        );
    }

    return (
        <a href={href} className={classe}>
            {children}
        </a>
    );
};
