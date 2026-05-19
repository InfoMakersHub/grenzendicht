#!/usr/bin/env python3
"""
GrenzenDicht — maandelijkse data-update script
Gebruik: python3 scripts/update_cijfers.py

Haalt de meest recente IND maandcijfers op via CBS StatLine API,
vergelijkt met de huidige data in js/main.js, en werkt bij indien nodig.
"""

import json
import re
import sys
import urllib.request
from datetime import date, datetime

MAIN_JS = "js/main.js"

# CBS StatLine OData API — Asielverzoeken en nareizigers per maand
# Dataset: Asielaanvragen en nareizigers (85501NED)
CBS_BASE = "https://opendata.cbs.nl/ODataApi/OData/85501NED"

MAANDEN_NL = {
    1: "Jan", 2: "Feb", 3: "Mrt", 4: "Apr", 5: "Mei", 6: "Jun",
    7: "Jul", 8: "Aug", 9: "Sep", 10: "Okt", 11: "Nov", 12: "Dec"
}

LABEL_SUFFIX = {
    2025: "'25", 2026: "'26", 2027: "'27"
}


def fetch_json(url):
    with urllib.request.urlopen(url, timeout=20) as r:
        return json.loads(r.read())


def fetch_cbs_maandcijfers():
    """Haalt maandtotalen op via CBS StatLine."""
    try:
        # Haal beschikbare periodes op
        meta = fetch_json(f"{CBS_BASE}/Perioden?$format=json")
        perioden = {p["Key"]: p["Title"] for p in meta["value"]}

        # Haal asielverzoeken + nareizigers op
        data = fetch_json(
            f"{CBS_BASE}/TypedDataSet?$format=json"
            "&$select=Perioden,TotaalAsielaanvragen_1"
            "&$filter=startswith(Perioden,'2025') or startswith(Perioden,'2026')"
        )
        rows = data.get("value", [])
        if not rows:
            return None

        results = []
        for row in rows:
            key = row["Perioden"].strip()   # bijv. "2025MM01"
            val = row.get("TotaalAsielaanvragen_1")
            if val is None:
                continue
            # Parses "2025MM01" → jaar=2025, maand=1
            m = re.match(r"(\d{4})MM(\d{2})", key)
            if not m:
                continue
            jaar, maand = int(m.group(1)), int(m.group(2))
            results.append((jaar, maand, int(val)))

        results.sort()
        return results

    except Exception as e:
        print(f"⚠️  CBS API niet bereikbaar: {e}")
        return None


def read_current_values():
    """Lees huidige values uit js/main.js."""
    with open(MAIN_JS, encoding="utf-8") as f:
        content = f.read()
    m = re.search(r"values:\s*\[([^\]]+)\]", content)
    if not m:
        raise ValueError("Kan 'values' niet vinden in main.js")
    vals = [int(x.strip()) for x in m.group(1).split(",") if x.strip()]

    lm = re.search(r"labels:\s*\[([^\]]+)\]", content)
    if not lm:
        raise ValueError("Kan 'labels' niet vinden in main.js")
    labels = [x.strip().strip("'") for x in lm.group(1).split(",")]
    return labels, vals, content


def build_labels_and_values(data_rows):
    labels, values = [], []
    for jaar, maand, val in data_rows:
        suffix = LABEL_SUFFIX.get(jaar, f"'{str(jaar)[-2:]}")
        nl = MAANDEN_NL[maand]
        label = f"{nl} {suffix}" if jaar > 2025 or maand > 12 else f"{nl} '{str(jaar)[-2:]}"
        labels.append(label)
        values.append(val)
    return labels, values


def update_main_js(content, new_labels, new_values, note=""):
    labels_str = ", ".join(f"'{l}'" for l in new_labels)
    values_str = ", ".join(str(v) for v in new_values)

    content = re.sub(
        r"(labels:\s*\[)[^\]]+(\])",
        f"\\g<1>{labels_str}\\g<2>",
        content
    )
    content = re.sub(
        r"(values:\s*\[)[^\]]+(\])",
        f"\\g<1>{values_str}\\g<2>",
        content
    )

    # Update header comment
    today = date.today().strftime("%d-%m-%Y")
    content = re.sub(
        r"// Shared data.*?\n",
        f"// Shared data — bijgewerkt {today}{'. ' + note if note else ''}\n",
        content,
        count=1
    )
    return content


def main():
    print("GrenzenDicht — data-update")
    print(f"Datum: {date.today()}\n")

    cur_labels, cur_values, content = read_current_values()
    print(f"Huidige data: {len(cur_values)} maanden ({cur_labels[0]} t/m {cur_labels[-1]})")

    print("\nCBS StatLine ophalen...")
    cbs_data = fetch_cbs_maandcijfers()

    if cbs_data:
        print(f"CBS geeft {len(cbs_data)} maanden terug.")
        new_labels, new_values = build_labels_and_values(cbs_data)

        if new_values == cur_values:
            print("\n✅ Data is al actueel. Geen wijzigingen nodig.")
            return

        print("\nNieuwe waarden:")
        for (j, mn, v), old in zip(cbs_data, cur_values + [None] * 99):
            diff = f"  (was {old:,})" if old else "  (nieuw)"
            print(f"  {MAANDEN_NL[mn]} {j}: {v:,}{diff}")

        antwoord = input("\nData bijwerken in js/main.js? [j/N] ").strip().lower()
        if antwoord != "j":
            print("Geannuleerd.")
            return

        new_content = update_main_js(content, new_labels, new_values)
        with open(MAIN_JS, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"\n✅ js/main.js bijgewerkt ({len(new_values)} maanden).")
        print("Vergeet niet: git add js/main.js && git commit -m 'data: update IND cijfers' && git push")

    else:
        print("\n⚠️  Automatisch ophalen mislukt.")
        print("\nHandmatig bijwerken:")
        print("  1. Ga naar: https://ind.nl/nl/over-ind/statistieken-en-publicaties/asieltrends")
        print("  2. Of CBS:  https://www.cbs.nl/nl-nl/onderwerp/asielzoekers")
        print("  3. Geef de nieuwe maandcijfers hieronder in.")
        print()

        invoer = input("Nieuwe waarden (komma-gescheiden, bijv. 3560,3510,...): ").strip()
        if not invoer:
            print("Geen invoer. Geannuleerd.")
            return

        try:
            new_vals = [int(x.strip()) for x in invoer.split(",")]
        except ValueError:
            print("Ongeldige invoer.")
            sys.exit(1)

        # Genereer labels op basis van huidige labels + aanvulling
        n_new = len(new_vals) - len(cur_values)
        if n_new <= 0:
            print("Geen nieuwe maanden toegevoegd.")
            return

        # Bouw nieuwe labels automatisch voort
        last_label = cur_labels[-1]   # bijv. "Apr '26*"
        clean = last_label.replace("*", "").strip()
        # Simpele aanvulling: vraag aan gebruiker
        new_labels_str = input(f"Labels voor {len(new_vals)} maanden (komma-gescheiden): ").strip()
        new_labels = [l.strip() for l in new_labels_str.split(",")]

        new_content = update_main_js(content, new_labels, new_vals)
        with open(MAIN_JS, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"\n✅ js/main.js bijgewerkt.")
        print("Volgende stap: git add js/main.js && git commit -m 'data: update IND cijfers' && git push")


if __name__ == "__main__":
    main()
