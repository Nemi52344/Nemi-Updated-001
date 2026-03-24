import { useState } from "react";
import { X, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(100).optional(),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ open, onClose }: ContactFormModalProps) => {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    const subject = encodeURIComponent(`Demo Request from ${result.data.name}`);
    const body = encodeURIComponent(
      `Name: ${result.data.name}\nEmail: ${result.data.email}\nCompany: ${result.data.company || "N/A"}\n\n${result.data.message}`
    );
    window.location.href = `mailto:contact@nemi.ai?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleClose = () => {
    setForm({ name: "", email: "", company: "", message: "" });
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  const inputStyle = {
    background: "hsl(230 20% 10% / 0.8)",
    border: "1px solid hsl(275 80% 55% / 0.2)",
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 100, background: "hsl(230 25% 4% / 0.85)", backdropFilter: "blur(12px)" }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl p-8 animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: "linear-gradient(145deg, hsl(230 20% 10%), hsl(230 25% 6%))",
          border: "1px solid hsl(275 80% 55% / 0.2)",
          boxShadow: "0 0 60px hsl(275 80% 55% / 0.1), 0 25px 50px hsl(230 25% 4% / 0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          style={{ background: "hsl(275 80% 55% / 0.1)" }}
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "hsl(275 80% 55% / 0.15)", border: "1px solid hsl(275 80% 55% / 0.3)" }}
            >
              <Send className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Message Ready</h3>
            <p className="text-sm text-muted-foreground">Your email client should open with the message pre-filled. If not, email us at contact@nemi.ai</p>
            <button
              onClick={handleClose}
              className="mt-6 px-6 py-2 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                color: "hsl(0 0% 100%)",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3
              className="text-xl md:text-2xl font-bold text-foreground mb-1"
              style={{ textShadow: "0 0 20px hsl(275 80% 60% / 0.3)" }}
            >
              Request a Demo
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Fill in your details and we'll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  style={inputStyle}
                  maxLength={100}
                />
                {errors.name && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                  style={inputStyle}
                  maxLength={255}
                />
                {errors.email && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.email}</p>}
              </div>

              <input
                type="text"
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                style={inputStyle}
                maxLength={100}
              />

              <div>
                <textarea
                  placeholder="How can we help? *"
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                  style={inputStyle}
                  maxLength={1000}
                />
                {errors.message && <p className="text-xs mt-1" style={{ color: "hsl(0 70% 55%)" }}>{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.02] mt-1"
                style={{
                  background: "linear-gradient(135deg, hsl(275 80% 55%), hsl(260 70% 45%))",
                  color: "hsl(0 0% 100%)",
                  boxShadow: "0 0 25px hsl(275 80% 55% / 0.3)",
                }}
              >
                Send Message
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactFormModal;
