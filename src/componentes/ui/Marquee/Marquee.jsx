import "./marquee.css";

export const Marquee = ({ children, reverse = false }) => {
    return (
        <div className='w-full grad-btn py-4 overflow-hidden'>
            <div
                className={`marquee__track flex w-max gap-4 font-titulo text-xl text-white ${
                    reverse ? "marquee__track--reverse" : ""
                }`}
            >
                {/* children já chega como <li>s; duplicamos a lista para o loop contínuo */}
                {[0, 1].map((dup) => (
                    <ul
                        key={dup}
                        className='flex gap-4 shrink-0'
                        aria-hidden={dup === 1}
                    >
                        {children}
                    </ul>
                ))}
            </div>
        </div>
    );
};
