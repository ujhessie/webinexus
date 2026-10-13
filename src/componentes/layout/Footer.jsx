import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export const Footer = ({
    logo = "/logo.png",
    tagline = "Soluções para quem quer evoluir",
    copyright = "Direitos Reservados a Web iNexus",
    linksNavegacao = [
        { texto: "Página Inicial", href: "/" },
        { texto: "Quem Somos", href: "/quem-somos" },
        { texto: "Soluções", href: "#solucoes" },
        { texto: "Portfólio", href: "/portfolio" },
        { texto: "Quem somos", href: "/quem-somos" },
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
}) => {
    return (
        <footer className='w-full bg-preto-escuro border-t border-white/10 py-16 sm:py-20 text-white'>
            <div className='content-section'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 items-start'>
                    {/* Coluna 1: Marca, Tagline e Copyright */}
                    <div className='flex flex-col items-start sm:col-span-2 lg:col-span-1'>
                        <Link
                            to='/'
                            className='inline-block hover:opacity-90 transition-opacity'
                        >
                            <img
                                src={logo}
                                alt='Web iNexus'
                                className='h-7 sm:h-8 w-auto object-contain'
                            />
                        </Link>
                        <p className='text-sm text-neutral-300 font-corpo mt-4 leading-relaxed'>
                            {tagline}
                        </p>
                        <p className='text-xs text-neutral-400 font-corpo mt-2'>
                            {copyright}
                        </p>
                    </div>

                    {/* Coluna 2: Navegação */}
                    <div>
                        <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4 tracking-tight'>
                            Navegação
                        </h4>
                        <ul className='flex lg:flex-col gap-4 lg:gap-1'>
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
                        <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4 tracking-tight'>
                            Soluções
                        </h4>
                        <ul className='flex lg:flex-col gap-4 lg:gap-1 flex-wrap'>
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
                        <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4 tracking-tight'>
                            Legal
                        </h4>
                        <ul className='flex lg:flex-col gap-4 lg:gap-1 flex-wrap'>
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
                        <h4 className='font-titulo font-bold text-white text-base sm:text-lg mb-4 tracking-tight'>
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
                                    className='w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:bg-neutral-200 hover:scale-105 transition-all shadow-md shrink-0'
                                >
                                    {rede.icone}
                                </a>
                            ))}
                        </div>
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
