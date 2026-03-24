import { useState } from "react";

interface DistributeSectionProps {
  scrollProgress: number;
}

const rangeProgress = (scroll: number, start: number, end: number) =>
  Math.min(Math.max((scroll - start) / (end - start), 0), 1);

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Product {
  name: string;
  icon: string;
  colorHsl: string;
}

const products: Product[] = [
  { name: "Vehicle", icon: "🚗", colorHsl: "210 85% 55%" },
  { name: "Drone", icon: "🛸", colorHsl: "275 80% 60%" },
  { name: "Coffee Machine", icon: "☕", colorHsl: "30 70% 50%" },
];

const DistributeSection = ({ scrollProgress }: DistributeSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Section: 0.67–0.71
  const sectionVisible = scrollProgress > 0.665 && scrollProgress < 0.715;
  const enterP = easeOut(rangeProgress(scrollProgress, 0.672, 0.685));
  const exitP = easeOut(rangeProgress(scrollProgress, 0.70, 0.71));

  if (!sectionVisible) return null;

  const opacity = enterP * (1 - exitP);

  const handleSelect = (name: string) => {
    setSelectedProduct(name);
    setShowPayment(true);
  };

  const handlePayment = () => {
    setShowPayment(false);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedProduct(null);
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 40, opacity, background: "hsl(230 25% 4%)" }}
    >
      {/* Green confirmation flash */}
      {showConfirmation && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 60,
            background: "hsl(145 75% 30% / 0.15)",
            animation: "fade-in 0.5s ease-out",
          }}
        >
          <div className="text-center max-w-lg mx-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{
                background: "hsl(145 75% 45% / 0.2)",
                border: "2px solid hsl(145 75% 50% / 0.5)",
                boxShadow: "0 0 40px hsl(145 75% 50% / 0.3)",
              }}
            >
              <span className="text-4xl">✓</span>
            </div>
            <p
              className="text-lg md:text-xl font-light leading-relaxed text-foreground tracking-wide"
              style={{ textShadow: "0 0 20px hsl(145 75% 50% / 0.3)" }}
            >
              Thank you for making the purchase — we're dispatching your order now. Don't worry about waiting time, we're fast and autonomous.
            </p>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {showPayment && !showConfirmation && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 55, background: "hsl(0 0% 0% / 0.6)", backdropFilter: "blur(8px)" }}
        >
          <div
            className="max-w-sm w-full mx-6 rounded-2xl border p-8"
            style={{
              background: "hsl(230 25% 10%)",
              borderColor: "hsl(230 15% 25%)",
              boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5)",
            }}
          >
            <h3 className="text-xl font-bold text-foreground mb-2">
              Purchase {selectedProduct}
            </h3>
            <p className="text-sm text-muted-foreground mb-8">Select a payment option</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handlePayment}
                className="w-full py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, hsl(270 60% 55%), hsl(275 80% 60%))",
                  color: "hsl(0 0% 100%)",
                  boxShadow: "0 4px 20px hsl(275 80% 60% / 0.3)",
                }}
              >
                Pay Now
              </button>
              <button
                onClick={handlePayment}
                className="w-full py-3 rounded-xl text-sm font-semibold tracking-wider uppercase border transition-all duration-200 hover:scale-[1.02]"
                style={{
                  borderColor: "hsl(230 15% 30%)",
                  color: "hsl(0 0% 80%)",
                  background: "hsl(230 25% 12%)",
                }}
              >
                Finance Now
              </button>
              <button
                onClick={() => { setShowPayment(false); setSelectedProduct(null); }}
                className="w-full py-2 text-xs text-muted-foreground tracking-wider uppercase mt-2 hover:text-foreground transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      {!showConfirmation && (
        <div className="max-w-4xl w-full mx-6">
          <div
            className="text-center mb-12"
            style={{ opacity: enterP, transform: `translateY(${(1 - enterP) * 30}px)` }}
          >
            <h2
              className="text-sm md:text-base tracking-[0.4em] uppercase text-muted-foreground mb-3"
              style={{ textShadow: "0 0 15px hsl(275 80% 60% / 0.3)" }}
            >
              Distribute
            </h2>
            <h3
              className="text-2xl md:text-4xl font-bold text-foreground tracking-wider"
              style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
            >
              Select the product you wish to purchase
            </h3>
          </div>

          {/* Product cards */}
          <div className="flex justify-center gap-6 md:gap-10">
            {products.map((product, i) => {
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={product.name}
                  className="flex flex-col items-center cursor-pointer pointer-events-auto"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSelect(product.name)}
                  style={{
                    opacity: enterP,
                    transform: `translateY(${(1 - enterP) * (40 + i * 15)}px)`,
                  }}
                >
                  <div
                    className="w-32 h-40 md:w-44 md:h-52 rounded-2xl border-2 flex items-center justify-center transition-all duration-500"
                    style={{
                      borderColor: isHovered ? `hsl(${product.colorHsl})` : "hsl(230 15% 22%)",
                      background: isHovered
                        ? `linear-gradient(160deg, hsl(${product.colorHsl} / 0.12), hsl(${product.colorHsl} / 0.04))`
                        : "hsl(230 25% 10%)",
                      boxShadow: isHovered
                        ? `0 10px 40px hsl(${product.colorHsl} / 0.2), 0 0 20px hsl(${product.colorHsl} / 0.1)`
                        : "0 4px 20px hsl(0 0% 0% / 0.3)",
                      transform: isHovered ? "scale(1.1) rotateY(15deg)" : "scale(1) rotateY(0deg)",
                      transformStyle: "preserve-3d",
                      perspective: "600px",
                    }}
                  >
                    <span
                      className="text-5xl md:text-6xl transition-transform duration-500"
                      style={{
                        transform: isHovered ? "scale(1.2) rotateY(-15deg)" : "scale(1)",
                        filter: isHovered ? `drop-shadow(0 0 20px hsl(${product.colorHsl} / 0.5))` : "none",
                      }}
                    >
                      {product.icon}
                    </span>
                  </div>
                  <span
                    className="mt-4 text-sm md:text-base tracking-widest uppercase font-medium transition-colors duration-300"
                    style={{ color: isHovered ? `hsl(${product.colorHsl})` : "hsl(230 25% 60%)" }}
                  >
                    {product.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistributeSection;
