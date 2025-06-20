// app/contact/page.tsx
"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === 200) {
        setStatus(t("contact.success"));
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(t("contact.error"));
      }
    } catch (error) {
      setStatus(t("contact.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">{t("contact.title")}</h1>
        <p className="max-w-[700px] text-muted-foreground">{t("contact.description")}</p>
      </div>

      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              {t("contact.name")}
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              {t("contact.email")}
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              {t("contact.message")}
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="mt-1"
              rows={5}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("contact.sending") : t("contact.submit")}
          </Button>
        </form>
        {status && (
          <p className={`mt-4 text-center ${status.includes("error") ? "text-red-500" : "text-green-500"}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}