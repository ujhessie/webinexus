import "./marquee.css";

export const Marquee = ({ children, reverse = false }) => {
    return (
        <div className='flex overflow-hidden w-full py-4 font-titulo text-xl'>
            <ul
                className={`flex shrink-0 gap-4 ${reverse == true ? "marquee__track--reverse" : "marquee__track"}`}
            >
                {children}
                {children}
            </ul>
        </div>
    );
};
