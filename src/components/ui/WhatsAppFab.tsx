import { WhatsAppButton } from "./WhatsAppButton";
import { WhatsAppGlyph } from "./WhatsAppGlyph";

/** Global floating WhatsApp button — persistent low-friction lead channel. */
export function WhatsAppFab() {
  return (
    <WhatsAppButton
      source="fab"
      className="group fixed z-50 bottom-5 right-5 sm:bottom-6 sm:right-6 flex items-center justify-center w-14 h-14 rounded-full bg-[#15803d] text-white shadow-[0_8px_30px_rgba(21,128,61,0.4)] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803d]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <WhatsAppGlyph className="w-7 h-7" />
      <span className="sr-only">Falar no WhatsApp</span>
    </WhatsAppButton>
  );
}
