import Image from 'next/image';

interface PoweredByProps {
    color: string,
}

export default function PoweredBy(props: PoweredByProps) {
    return (
        <>
        {props.color == "white" ?
            <div className="flex justify-center text-sm text-gray-400">powered by</div>
            :
            <div className="flex justify-center text-sm">powered by</div>
        }
            <div className="flex justify-center items-center lg:mb-4">
                {props.color == "white" ?
                <Image 
                src="/symphonize_logo_white.png" 
                loading="lazy" 
                width={125} 
                height={38}
                alt="Symphonize, Inc." />
                :
                <Image 
                    src="/symphonize_logo_black.png" 
                    loading="lazy" 
                    width={125} 
                    height={38}
                    alt="Symphonize, Inc." />
            }   
            </div>
        </>
    );
  }