import {  Sparkles } from "lucide-react";
export const Badge = ({ textoBadge = "BEM VINDOS!" }) => {
    return (
        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-roxo-principal/50 bg-roxo-principal/15 backdrop-blur-sm text-roxo-principal font-semibold text-xs sm:text-sm tracking-wider uppercase mb-4'>
            <Sparkles className='w-4 h-4 text-roxo-principal' />
            <span>{textoBadge}</span>
        </div>
    );
};