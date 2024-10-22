export default function Image({ src, alt }: { src: string, alt: string }) {
    return (
        <img
            className="overflow-hidden w-full h-full object-cover object-center"
            src={src}
            alt={alt}
        />
    )
}
