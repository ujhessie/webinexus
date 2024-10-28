export const Desc:React.FC<{desc?:string}> = ({desc}) => {
    return (
        <p className='desc text-white text-[12px] opacity-60'>
         {desc}
        </p>
    )
}