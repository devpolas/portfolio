import Image from "next/image"

export default function HeroRight() {
  return (
    <div className="relative flex justify-center">
      <div className="relative aspect-square w-70 sm:w-87.5 md:w-125">
        <div className="absolute inset-1.5 overflow-hidden rounded-full bg-background">
          <Image
            src="/hero.webp"
            alt="Polas"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>{" "}
    </div>
  )
}
