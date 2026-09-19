#!/usr/bin/env python3
"""Génère public/carte.pdf — carte officielle Le Continent 237."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "carte.pdf"
FONT_SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_SANS_B = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
FONT_SERIF_B = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
FONT_SERIF_I = "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf"

NOIR = (10, 10, 10)
CREME = (253, 251, 247)
OR = (232, 145, 42)
JAUNE = (252, 209, 22)
VERT = (0, 122, 94)
ROUGE = (206, 17, 38)
GRIS = (90, 86, 80)

MENU = [
    (
        "Viandes de bœuf",
        [
            ("5 brochettes de bœuf", "180 g · + accompagnement au choix", "15 €"),
            ("Tendons de bœuf sautés", "180 g · + accompagnement au choix", "12 €"),
            ("Tripes de bœuf sautées", "180 g · + accompagnement au choix", "12 €"),
            ("Mafé", "Bœuf, riz, sauce arachide", "12 €"),
        ],
    ),
    (
        "Porc & spécialités",
        [
            ("Porc braisé", "180 g · + accompagnement au choix", "12 €"),
            ("Porc sauté sauce tomate", "+ accompagnement au choix", "15 €"),
            ("Mbongo", "+ accompagnement au choix", "20 €"),
        ],
    ),
    (
        "Volailles",
        [
            ("Ailes de poulet", "+ accompagnement au choix", "12 €"),
            ("Cuisses de poulet braisées", "180 g · + accompagnement au choix", "12 €"),
            ("Poulet DG", "+ accompagnement au choix", "12 €"),
            ("Poulet Yassa", "+ accompagnement au choix", "12 €"),
        ],
    ),
    (
        "Spécialités africaines",
        [
            ("Couscous sauce gombo", "Viande de bœuf", "15 €"),
            ("Couscous sauce gombo mixte", "", "20 €"),
            ("Ndolé", "+ accompagnement au choix", "15 €"),
            ("Ndolé mixte", "Viande + crevettes · + accompagnement", "20 €"),
            ("Ndolé Royale", "Viande, crevettes, poisson fumé, moru", "25 €"),
            ("Eru", "Viande de bœuf + peau de bœuf · + accompagnement", "15 €"),
            ("Eru Royale", "+ accompagnement au choix", "20 €"),
            ("Taro pilé", "Le dimanche uniquement", "20 €"),
        ],
    ),
    (
        "Poissons & fruits de mer",
        [
            ("Poisson braisé — tilapia", "+ accompagnement au choix", "15 €"),
            ("Poisson braisé — bar capitaine", "+ accompagnement · selon la taille", "20 / 25 / 30 €"),
            ("Poisson braisé — maquereau", "+ accompagnement · selon la taille", "15 / 20 / 25 €"),
            ("Pépé soupe de poisson", "+ accompagnement au choix", "20 €"),
        ],
    ),
    (
        "Plats traditionnels",
        [
            ("Tieb poulet", "", "15 €"),
            ("Tieb poisson", "", "15 €"),
        ],
    ),
    (
        "Boissons",
        [
            ("Softs 33 cl", "Oasis, Fanta fruit du dragon, Schweppes, Coca Chérie…", "2 €"),
            ("Red Bull 25 cl", "", "3 €"),
            ("Boissons africaines 60 cl", "Top grenadine, ananas, pamplemousse, Djino · Malta 33 cl", "7 €"),
            ("Heineken · 1664", "Formule Heineken 12 €", "5 €"),
            ("Leffe · Desperados · Kadji · Castel · Isenbeck · Mutzig · Ice · Booster", "", "8 €"),
            ("Petite Guinness", "Formule petites Guinness 13 €", "5 €"),
            ("Grande Guinness", "", "10 €"),
            ("Vins & champagne 75 cl", "Cabernet d'Anjou 15 € · Mouton Cadet 20 € · Montbazillac 20 € · Moët 80 €", "dès 15 €"),
            ("Whiskies & spiritueux", "Jack Daniel's 10 cl · Chivas 12/15/18 ans · Black Label 12 ans", "dès 7 €"),
            ("Apéritifs 10 cl", "Martini rouge ou blanc · Baileys · Cognac", "7 €"),
        ],
    ),
]


class Carte(FPDF):
    def header(self):
        self.set_fill_color(*NOIR)
        self.rect(0, 0, 210, 297, "F")
        self.set_fill_color(*VERT)
        self.rect(0, 0, 70, 5, "F")
        self.set_fill_color(*ROUGE)
        self.rect(70, 0, 70, 5, "F")
        self.set_fill_color(*JAUNE)
        self.rect(140, 0, 70, 5, "F")

        if self.page_no() == 1:
            self.set_y(16)
            self.set_text_color(*JAUNE)
            self.set_font("Sans", "", 9)
            self.cell(0, 6, "RESTAURANT GRILL AU FEU DE BOIS", align="C", new_x="LMARGIN", new_y="NEXT")
            self.set_text_color(*CREME)
            self.set_font("Serif", "B", 28)
            self.cell(0, 12, "Le Continent 237", align="C", new_x="LMARGIN", new_y="NEXT")
            self.set_font("Serif", "I", 14)
            self.set_text_color(*OR)
            self.cell(0, 8, "Chez Fefe  ·  La carte", align="C", new_x="LMARGIN", new_y="NEXT")
            self.set_font("Sans", "", 9)
            self.set_text_color(180, 175, 165)
            self.cell(
                0,
                7,
                "18 Grande Rue, 91260 Juvisy-sur-Orge  ·  01 69 38 30 23  ·  WhatsApp 06 66 60 17 59",
                align="C",
                new_x="LMARGIN",
                new_y="NEXT",
            )
            self.ln(4)
        else:
            self.set_y(12)
            self.set_text_color(*JAUNE)
            self.set_font("Serif", "B", 14)
            self.cell(0, 8, "Le Continent 237  —  Chez Fefe", align="C", new_x="LMARGIN", new_y="NEXT")
            self.ln(2)

    def footer(self):
        self.set_y(-16)
        self.set_font("Sans", "", 8)
        self.set_text_color(140, 135, 128)
        self.cell(
            0,
            5,
            "Tous les jours 12h–00h  ·  Ticket moyen 12–25 €  ·  © 2026 LEPRINCE GAYE",
            align="C",
            new_x="LMARGIN",
            new_y="NEXT",
        )
        self.cell(0, 4, f"{self.page_no()} / {{nb}}", align="C")

    def section(self, title):
        if self.get_y() > 250:
            self.add_page()
        self.ln(2)
        self.set_font("Serif", "B", 13)
        self.set_text_color(*JAUNE)
        self.cell(0, 8, title.upper(), new_x="LMARGIN", new_y="NEXT")
        y = self.get_y()
        self.set_draw_color(*VERT)
        self.set_line_width(0.4)
        self.line(18, y, 192, y)
        self.ln(3)

    def dish(self, name, desc, price):
        if self.get_y() > 268:
            self.add_page()
        self.set_font("Sans", "B", 10)
        self.set_text_color(*CREME)
        name_w = 148
        self.cell(name_w, 5.4, name)
        self.set_text_color(*JAUNE)
        self.cell(26, 5.4, price, align="R", new_x="LMARGIN", new_y="NEXT")
        if desc:
            self.set_font("Sans", "", 8)
            self.set_text_color(165, 160, 152)
            self.multi_cell(174, 4, desc)
        self.ln(1.2)


def main():
    pdf = Carte(format="A4", unit="mm")
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=22)
    pdf.add_font("Sans", "", FONT_SANS)
    pdf.add_font("Sans", "B", FONT_SANS_B)
    pdf.add_font("Serif", "", FONT_SERIF)
    pdf.add_font("Serif", "B", FONT_SERIF_B)
    pdf.add_font("Serif", "I", FONT_SERIF_I)
    pdf.set_margins(18, 18, 18)
    pdf.add_page()

    for title, dishes in MENU:
        pdf.section(title)
        for name, desc, price in dishes:
            pdf.dish(name, desc, price)

    pdf.ln(4)
    pdf.set_fill_color(18, 16, 14)
    pdf.set_draw_color(*OR)
    pdf.set_line_width(0.3)
    y = pdf.get_y()
    if y > 240:
        pdf.add_page()
        y = pdf.get_y()
    pdf.rect(18, y, 174, 32, "D")
    pdf.set_xy(22, y + 4)
    pdf.set_font("Serif", "B", 11)
    pdf.set_text_color(*JAUNE)
    pdf.cell(0, 6, "Accompagnements & suppléments", new_x="LMARGIN", new_y="NEXT")
    pdf.set_x(22)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*CREME)
    pdf.multi_cell(
        166,
        4.2,
        "Inclus : bâton de manioc · bananes plantain (aloko) · chikwang · plantain vapeur · "
        "plantain vert frappé à l’huile rouge · plantain tapée · riz blanc parfumé · attiéké.\n"
        "Supplément 3 € : frites · chikwang · riz · attiéké · plantain tapée · couscous.",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(OUT)
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
