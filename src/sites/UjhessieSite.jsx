import React from "react";

export default function UjhessieSite() {
    return (
        <div className='min-h-screen bg-fundo text-white font-corpo selection:bg-roxo-secundario selection:text-white flex flex-col items-center justify-center p-6 text-center'>
            <div className='max-w-md w-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl'>
                <span className='inline-block px-3.5 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-roxo-secundario bg-roxo-secundario/10 rounded-full border border-roxo-secundario/20'>
                    Site Ativo
                </span>
                <h1 className='font-titulo text-3xl sm:text-4xl font-bold text-white mb-2'>
                    Ujhessie
                </h1>
                <p className='text-texto-suave text-base'>
                    ujhessie.vercel.app
                </p>
            </div>
        </div>
    );
}
