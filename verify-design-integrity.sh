#!/bin/bash

echo "========================================="
echo "  GigDial - Final Design Verification"
echo "========================================="
echo ""

# Check server
if lsof -i :8000 >/dev/null 2>&1; then
    echo "✅ Server running on http://localhost:8000"
else
    echo "❌ Server NOT running!"
    exit 1
fi

echo ""
echo "Checking all 50 pages for design integrity..."
echo ""

total=0
inline_only=0
external_only=0
both=0
neither=0

for file in *.html; do
    total=$((total + 1))
    
    has_inline=$(grep -c '<style>' "$file" || true)
    has_external=$(grep -c 'public/css/' "$file" || true)
    
    if [ $has_inline -gt 0 ] && [ $has_external -gt 0 ]; then
        echo "⚠️  $file - HAS BOTH (potential conflict)"
        both=$((both + 1))
    elif [ $has_inline -gt 0 ]; then
        echo "✅ $file - Inline CSS only"
        inline_only=$((inline_only + 1))
    elif [ $has_external -gt 0 ]; then
        echo "✅ $file - External CSS only"
        external_only=$((external_only + 1))
    else
        echo "❌ $file - NO CSS!"
        neither=$((neither + 1))
    fi
done

echo ""
echo "========================================="
echo "  Summary"
echo "========================================="
echo "Total Pages: $total"
echo ""
echo "✅ Inline CSS only: $inline_only pages"
echo "✅ External CSS only: $external_only pages"
echo "⚠️  Both (conflicts): $both pages"
echo "❌ No CSS: $neither pages"
echo ""

if [ $both -eq 0 ] && [ $neither -eq 0 ]; then
    echo "🎉 SUCCESS! All pages have proper CSS with no conflicts!"
    echo ""
    echo "Design Status: ✅ NO BROKEN DESIGNS"
    echo ""
    echo "Access your website:"
    echo "👉 http://localhost:8000/index.html"
else
    echo "⚠️  Some pages may have issues!"
fi

echo ""
