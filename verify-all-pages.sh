#!/bin/bash

echo "==================================="
echo "GigDial Website - Page Verification"
echo "==================================="
echo ""

# Check if server is running
if lsof -i :8000 >/dev/null 2>&1; then
    echo "✅ Local server is running on port 8000"
else
    echo "❌ Local server is NOT running!"
    echo "   Run: python3 -m http.server 8000"
    exit 1
fi

echo ""
echo "Checking all HTML pages..."
echo ""

# Counter
total=0
success=0
failed=0

# Check each HTML file
for file in *.html; do
    total=$((total + 1))
    
    # Check if file has CSS links
    if grep -q 'href="public/css/' "$file"; then
        echo "✅ $file - CSS paths correct"
        success=$((success + 1))
    else
        echo "❌ $file - CSS paths MISSING or INCORRECT"
        failed=$((failed + 1))
    fi
done

echo ""
echo "==================================="
echo "Summary:"
echo "==================================="
echo "Total Pages: $total"
echo "✅ Correct: $success"
echo "❌ Failed: $failed"
echo ""

if [ $failed -eq 0 ]; then
    echo "🎉 All pages are configured correctly!"
    echo ""
    echo "Access your website at:"
    echo "👉 http://localhost:8000/index.html"
else
    echo "⚠️  Some pages need fixing!"
fi

echo ""
