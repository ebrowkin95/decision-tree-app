#!/bin/bash

# Setup Script für automatisiertes Deployment
echo "🚀 Setting up automated deployment for Decision Tree App..."

# 1. Prüfe ob Git Repository vorhanden
if [ ! -d ".git" ]; then
    echo "❌ Kein Git Repository gefunden. Bitte zuerst 'git init' ausführen."
    exit 1
fi

# 2. Prüfe ob Supabase CLI installiert ist
if ! command -v supabase &> /dev/null; then
    echo "📦 Installiere Supabase CLI..."
    npm install -g supabase
fi

# 3. Erstelle .env Datei falls nicht vorhanden
if [ ! -f ".env" ]; then
    echo "📝 Erstelle .env Datei..."
    cp .env.example .env
    echo "⚠️  Bitte .env Datei mit Ihren Supabase-Credentials ausfüllen!"
fi

# 4. Installiere Dependencies
echo "📦 Installiere Dependencies..."
npm install

# 5. Prüfe Netlify CLI Installation
if ! command -v netlify &> /dev/null; then
    echo "📦 Installiere Netlify CLI..."
    npm install -g netlify-cli
fi

# 6. Erste Build
echo "🔨 Erstelle ersten Build..."
npm run build

echo "✅ Setup abgeschlossen!"
echo ""
echo "🎯 Verfügbare Commands:"
echo "  npm run deploy          - Vollständiges Deployment (build + git push)"
echo "  npm run deploy:quick    - Schnelles Deployment (nur dist)"
echo "  npm run db:migrate      - Datenbank Migration"
echo "  npm run db:status       - Supabase Status"
echo "  npm run db:link         - Projekt mit Supabase verknüpfen"
echo ""
echo "🔧 Nächste Schritte:"
echo "  1. .env Datei ausfüllen"
echo "  2. 'npm run db:link' ausführen"
echo "  3. 'npm run db:migrate' für Database Setup"
echo "  4. 'npm run deploy' für erstes Deployment"