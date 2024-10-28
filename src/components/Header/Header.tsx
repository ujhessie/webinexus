"use client";

import { TbMenu } from "react-icons/tb";

import { TfiClose } from "react-icons/tfi";
import "./header.css";
import { MaxWidthContainer } from "../MaxWidthContainer/MaxWidthContainer";
import { Logo } from "./components";
import { Link } from "react-router-dom";
import { MdArrowOutward } from 'react-icons/md';

export const Header = () => {
    function fecharNav() {
        document.querySelector(".nav-header")?.classList.remove("nav-ativa");
    }
    function abrirNav() {
        document.querySelector(".nav-header")?.classList.add("nav-ativa");
    }

    return (
        <header className='border-b border-cinza/20'>
            <MaxWidthContainer className='h-[100px] z-20 flex justify-between items-center  '>
                <Logo />
                <nav className=' nav-header    text-branco  fonte-corpo   '>
                    <div className='content flex  gap-4   text-5 text-cinza font-corpo font-bold'>
                        <div
                            className='div-close md:hidden '
                            onClick={fecharNav}
                        >
                            <TfiClose className='icon text-3xl' />
                        </div>
                        <Link to='/' onClick={fecharNav} className='hover:text-transparent hover:bg-clip-text hover:bg-gradient-principal font-bold'>
                            Início
                        </Link>
                        <Link to='/projetos' onClick={fecharNav} className='hover:text-transparent hover:bg-clip-text hover:bg-gradient-principal font-bold'>
                            Portfólio
                        </Link>
                        <Link to='/projetos' onClick={fecharNav} className='hover:text-transparent hover:bg-clip-text hover:bg-gradient-principal font-bold'>
                            Orçamento gratuito
                        </Link>
                        {/* <Link href='#div-po' onClick={fecharNav}>Projetos</Link> */}
                        {/* <Link href='/' onClick={fecharNav}>Sobre</Link>
                    <Link href='/' onClick={fecharNav}>Serviços</Link> */}
                    </div>
                </nav>
                <div className='botoes z-20 flex gap-4'>
                    <Link
                        to='/#div-projetos'
                        className='font-corpo text-branco-claro bg-roxo-pricipal py-4 px-10 rounded-md flex gap-1 items-center hover:brightness-125 my-transition'
                    >
                        Portfólio
                        <MdArrowOutward className='text-[25px]' />
                    </Link>
                    <div className='botao-menu md:hidden relative h-full bg-cinza text-white py-6 rounded-md px-8 flex itens-center justfy-center'>
                        <TbMenu
                            className='absolute z-10 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]  text-3xl'
                            onClick={abrirNav}
                        />
                    </div>
                </div>
            </MaxWidthContainer>
        </header>
    );
};
