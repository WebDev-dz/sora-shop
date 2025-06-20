// app/about/page.tsx
"use client"
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">{t("about.title")}</h1>
        <p className="max-w-[700px] text-muted-foreground">{t("about.description")}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6">{t("about.mission.title")}</h2>
          <p className="text-muted-foreground">{t("about.mission.description")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">{t("about.story.title")}</h2>
          <p className="text-muted-foreground">{t("about.story.description")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">{t("about.values.title")}</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>{t("about.values.quality")}</li>
            <li>{t("about.values.customer")}</li>
            <li>{t("about.values.integrity")}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}