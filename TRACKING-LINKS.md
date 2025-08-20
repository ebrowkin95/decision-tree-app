# Traffic Source Tracking Links

Diese Datei enthält Beispiel-Links für das Tracking von Traffic-Quellen in Ihrer Framework-Evaluation App.

## Basis-URL
```
https://ihre-domain.com/
```

## Empfohlene Tracking-Links

### 🔴 Reddit-Communities
```
Reddit r/Teachers:
https://ihre-domain.com/?source=reddit_teachers

Reddit r/Lehrerzimmer:
https://ihre-domain.com/?source=reddit_lehrerzimmer

Reddit r/de:
https://ihre-domain.com/?source=reddit_de

Reddit r/deutschland:
https://ihre-domain.com/?source=reddit_deutschland

Reddit r/education:
https://ihre-domain.com/?source=reddit_education
```

### 📘 Facebook-Gruppen
```
Facebook Lehrergruppen:
https://ihre-domain.com/?source=facebook_lehrergruppe

Facebook Teachers Community:
https://ihre-domain.com/?source=facebook_teachers

Facebook Digitale Bildung:
https://ihre-domain.com/?source=facebook_digitale_bildung
```

### 🌐 Lehrer-Foren & Websites
```
Lehrer-Online.de:
https://ihre-domain.com/?source=lehrer_online

4teachers.de:
https://ihre-domain.com/?source=vier_teachers

Lehrerfreund.de:
https://ihre-domain.com/?source=lehrerfreund

Lehrer-Magazin:
https://ihre-domain.com/?source=lehrer_magazin

Bildungsserver:
https://ihre-domain.com/?source=bildungsserver
```

### 💼 Professionelle Netzwerke
```
XING Lehrergruppen:
https://ihre-domain.com/?source=xing_lehrer

LinkedIn Education:
https://ihre-domain.com/?source=linkedin_education

BLLV (Bayerischer Lehrer- und Lehrerinnenverband):
https://ihre-domain.com/?source=bllv

GEW (Gewerkschaft Erziehung und Wissenschaft):
https://ihre-domain.com/?source=gew
```

### 🐦 Social Media
```
Twitter/X Education:
https://ihre-domain.com/?source=twitter_education

Instagram Teachers:
https://ihre-domain.com/?source=instagram_teachers

TikTok Education:
https://ihre-domain.com/?source=tiktok_education
```

### 💬 Messenger & Chat
```
WhatsApp Teilen:
https://ihre-domain.com/?source=whatsapp_share

Telegram Bildungsgruppen:
https://ihre-domain.com/?source=telegram_bildung

Discord Education:
https://ihre-domain.com/?source=discord_education
```

### 📧 Email & Newsletter
```
Email Newsletter:
https://ihre-domain.com/?source=email_newsletter

Direkter Email-Versand:
https://ihre-domain.com/?source=email_direkt

Uni-Verteiler:
https://ihre-domain.com/?source=uni_verteiler
```

### 🎓 Universitäten & Hochschulen
```
TU München:
https://ihre-domain.com/?source=uni_tum

LMU München:
https://ihre-domain.com/?source=uni_lmu

Uni Hamburg:
https://ihre-domain.com/?source=uni_hamburg

Uni Köln:
https://ihre-domain.com/?source=uni_koeln

HTW Berlin:
https://ihre-domain.com/?source=htw_berlin
```

## Erweiterte Tracking-Parameter

### UTM-Parameter (für Google Analytics Kompatibilität)
```
Mit Campaign Tracking:
https://ihre-domain.com/?utm_source=reddit&utm_medium=social&utm_campaign=framework_evaluation&utm_content=teachers_post

Mit Medium Unterscheidung:
https://ihre-domain.com/?utm_source=facebook&utm_medium=group_post&utm_campaign=bachelor_thesis
```

### Kombinierte Parameter
```
Reddit mit spezifischer Information:
https://ihre-domain.com/?source=reddit_teachers&campaign=bachelor_thesis&medium=post

Facebook mit Gruppenname:
https://ihre-domain.com/?source=facebook_lehrergruppe&content=grundschule_gruppe
```

## Verwendung der Links

### 1. **Für Reddit-Posts:**
```markdown
Ich evaluiere im Rahmen meiner Bachelorarbeit ein Framework zur Auswahl digitaler Medien. 
Würdet ihr mir bei der Umfrage helfen? Dauert nur 5-10 Minuten:
https://ihre-domain.com/?source=reddit_teachers

Danke für eure Unterstützung! 🙏
```

### 2. **Für Facebook-Gruppen:**
```
Liebe Kolleg:innen! 👋

Für meine Bachelorarbeit entwickle ich ein Framework, das Lehrer:innen bei der Auswahl digitaler Medien unterstützen soll. 

Würdet ihr mir 5-10 Minuten für eine Evaluation schenken?
https://ihre-domain.com/?source=facebook_lehrergruppe

Vielen Dank! 📚✨
```

### 3. **Für Email-Verteiler:**
```
Betreff: Kurze Umfrage zur Medienwahl im Unterricht (5-10 Min)

Liebe Kolleginnen und Kollegen,

ich bitte um Ihre Unterstützung für meine Bachelorarbeit. Ich evaluiere ein Framework zur Auswahl digitaler Medien im Unterricht.

Link zur Evaluation: https://ihre-domain.com/?source=email_verteiler

Die Teilnahme dauert nur 5-10 Minuten und ist vollständig anonym.

Herzlichen Dank!
```

## Tracking-Auswertung

Das System erfasst automatisch:
- **Quelle**: Der `source` Parameter aus der URL
- **Referrer**: Falls jemand direkt von einer Website kommt
- **Zeitstempel**: Wann der Besuch stattfand
- **Browser-Info**: Für technische Analyse
- **Vollständige URL**: Für detaillierte Nachverfolgung

### Datenbank-Speicherung
Die `traffic_source` wird in der `research_data` Tabelle gespeichert und ermöglicht Ihnen Analysen wie:
- Welche Kanäle bringen die meisten Teilnehmer?
- Gibt es Unterschiede in den Antworten je nach Herkunft?
- Welche Plattformen sind am effektivsten für Lehrerumfragen?

## Tipps für optimale Ergebnisse

### ✅ Do's:
- Verwenden Sie aussagekräftige source-Parameter
- Testen Sie die Links vor dem Versenden
- Dokumentieren Sie, wo Sie welche Links verwenden
- Variieren Sie die Ansprache je nach Plattform

### ❌ Don'ts:
- Keine Leerzeichen oder Sonderzeichen in source-Parametern
- Nicht dieselben Links für verschiedene Kampagnen verwenden
- Links nicht verkürzen ohne Tracking zu testen

## Linktest
Bevor Sie die Links verwenden, testen Sie sie:
1. Klicken Sie auf den Link
2. Öffnen Sie die Browser-Entwicklertools (F12)
3. In der Konsole sollten Sie sehen: "Traffic source captured: [ihr-source-parameter]"

Das bedeutet, das Tracking funktioniert korrekt! 🎯