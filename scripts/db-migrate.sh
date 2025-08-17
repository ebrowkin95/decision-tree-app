#!/bin/bash

# Database Migration Script
echo "🗄️ Starting database migration..."

# Check if supabase is linked
if [ ! -f "supabase/.gitignore" ]; then
    echo "❌ Supabase not linked. Run 'npm run db:link' first."
    exit 1
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please create it from .env.example"
    exit 1
fi

# Source environment variables
source .env

echo "📋 Available migration options:"
echo "  1. Push local migrations to remote"
echo "  2. Pull remote schema to local"
echo "  3. Reset database (DANGER!)"
echo "  4. Status check"
echo ""
read -p "Choose option (1-4): " choice

case $choice in
    1)
        echo "📤 Pushing migrations to remote database..."
        supabase db push
        ;;
    2)
        echo "📥 Pulling remote schema..."
        supabase db pull
        ;;
    3)
        echo "⚠️  This will DELETE ALL DATA in your database!"
        read -p "Are you sure? Type 'RESET' to confirm: " confirm
        if [ "$confirm" = "RESET" ]; then
            echo "🔥 Resetting database..."
            supabase db reset
        else
            echo "❌ Reset cancelled."
        fi
        ;;
    4)
        echo "📊 Checking database status..."
        supabase status
        supabase db diff
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo "✅ Migration complete!"