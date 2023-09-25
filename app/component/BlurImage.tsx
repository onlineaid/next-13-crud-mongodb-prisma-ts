'use client'
import Image from 'next/image'
import { useState } from 'react';

export default function BlurImage({ image, alt, width, height }: any) {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            alt={alt}
            src={image}
            width={width}
            height={height }
            // layout="fill"
            objectFit="cover"
            className={`
                duration-700 ease-in-out group-hover:opacity-75
                ${isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                })`}
            onLoadingComplete={() => setLoading(false)}
        />
    );
}