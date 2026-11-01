type ProgressiveBlurProps = {
  className?: string;
  direction?: "top" | "right" | "bottom" | "left";
  blurLayers?: number;
  blurIntensity?: number;
};

const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
} as const;

export function ProgressiveBlur({
  className = "",
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 1,
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const step = 1 / (layers + 1);
  const angle = GRADIENT_ANGLES[direction];

  return (
    <div className={`relative ${className}`}>
      {Array.from({ length: layers }, (_, index) => {
        const stops = [index, index + 1, index + 2, index + 3]
          .map((stop, position) => {
            const alpha = position === 1 || position === 2 ? 1 : 0;
            return `rgba(255, 255, 255, ${alpha}) ${stop * step * 100}%`;
          })
          .join(", ");
        const mask = `linear-gradient(${angle}deg, ${stops})`;
        const blur = `${index * blurIntensity}px`;

        return (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: mask,
              WebkitMaskImage: mask,
              backdropFilter: `blur(${blur})`,
              WebkitBackdropFilter: `blur(${blur})`,
            }}
          />
        );
      })}
    </div>
  );
}
