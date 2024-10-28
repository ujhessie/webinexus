import { Link } from "react-router-dom";

export const Logo = () => {
    return (
        <Link
            to='/'
            className='logo font-extrabold text-branco text-[32px] fonte-titulo texto-gradiente flex justify-start gap-2 items-end'
        >
            <img src='/images/icon-logo.svg' className='w-10'   alt='logo web inexus' />
            <p className='text-branco-claro font-titulo m-0'>Web iNexus</p>
        </Link>
    );
};
