import { cn } from "@/lib/utils";
import { skillGroups } from "@/data/skills"; // adjust to where your skills file lives

type BoneProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * One skeleton shape. Uses `animate-pulse` (Tailwind core), which Tailwind's
 * default config already turns off for `prefers-reduced-motion` via
 * `motion-reduce:animate-none`.
 */
function Bone({ className, style }: BoneProps) {
  return (
    <div
      aria-hidden='true'
      style={style}
      className={cn(
        "bg-foreground/8 rounded-md animate-pulse motion-reduce:animate-none",
        className,
      )}
    />
  );
}

/**
 * Chip widths come from real skill names, so the placeholder row has the same
 * ragged rhythm as the finished tech stack. Deterministic: no hydration drift.
 */
const CHIP_WIDTHS: number[] = (skillGroups[1]?.skills ?? [])
  .slice(0, 8)
  .map((name) => Math.round(name.length * 7.5 + 32)); // ~text width + padding

function TechStackBones() {
  return (
    <div className='flex flex-wrap gap-2'>
      {CHIP_WIDTHS.map((w, i) => (
        <Bone
          key={i}
          className='rounded-full max-w-full h-8'
          style={{ width: w }}
        />
      ))}
    </div>
  );
}

type ProjectDetailsLoadingProps = {
  className?: string;
  /** Screen-reader announcement */
  label?: string;
  /** Number of gallery thumbnails to hold space for */
  galleryCount?: number;
};

export default function ProjectDetailsLoading({
  className,
  label = "Loading project details...",
  galleryCount = 3,
}: ProjectDetailsLoadingProps) {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-busy='true'
      className={cn(
        "mx-auto px-4 sm:px-6 py-10 sm:py-14 w-full max-w-5xl",
        className,
      )}
    >
      <span className='sr-only'>{label}</span>

      {/* Back link */}
      <Bone className='mb-8 w-24 h-4' />

      {/* Title block */}
      <header className='flex flex-col gap-4 mb-8'>
        <Bone className='w-3/4 sm:w-1/2 h-9 sm:h-11' />
        <div className='flex flex-col gap-2'>
          <Bone className='w-full max-w-xl h-4' />
          <Bone className='w-2/3 max-w-md h-4' />
        </div>

        {/* Meta: role / year / status */}
        <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mt-1'>
          <Bone className='w-28 h-4' />
          <Bone className='w-20 h-4' />
          <Bone className='w-24 h-4' />
        </div>
      </header>

      {/* Hero image */}
      <Bone className='mb-10 rounded-2xl w-full aspect-video' />

      {/* Body + sidebar */}
      <div className='gap-10 grid lg:grid-cols-[1fr_16rem]'>
        {/* Description */}
        <section className='flex flex-col gap-3'>
          <Bone className='mb-2 w-40 h-6' />
          <Bone className='w-full h-4' />
          <Bone className='w-full h-4' />
          <Bone className='w-11/12 h-4' />
          <Bone className='w-full h-4' />
          <Bone className='w-3/5 h-4' />

          <Bone className='mt-6 mb-2 w-32 h-6' />
          <Bone className='w-full h-4' />
          <Bone className='w-10/12 h-4' />
          <Bone className='w-2/3 h-4' />
        </section>

        {/* Sidebar */}
        <aside className='flex flex-col gap-8'>
          <div className='flex flex-col gap-3'>
            <Bone className='w-24 h-5' />
            <TechStackBones />
          </div>

          <div className='flex flex-col gap-3'>
            <Bone className='rounded-full w-full h-11' />
            <Bone className='rounded-full w-full h-11' />
          </div>
        </aside>
      </div>

      {/* Gallery */}
      <div className='gap-4 grid grid-cols-2 sm:grid-cols-3 mt-12'>
        {Array.from({ length: galleryCount }, (_, i) => (
          <Bone key={i} className='rounded-xl aspect-4/3' />
        ))}
      </div>
    </div>
  );
}
