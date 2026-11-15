
#!/usr/bin/env bash

set -Eeuo pipefail

# ==========================================
# Portfolio Project Structure Setup
# ==========================================

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

# Detect portfolio root.
if [[ -f "$SCRIPT_DIR/package.json" ]]; then
    PROJECT_ROOT="$SCRIPT_DIR"
elif [[ -f "$SCRIPT_DIR/portfolio/package.json" ]]; then
    PROJECT_ROOT="$SCRIPT_DIR/portfolio"
else
    echo "Error: Could not find portfolio/package.json."
    echo "Place this script inside the portfolio root or its parent directory."
    exit 1
fi

cd "$PROJECT_ROOT"

echo
echo "=========================================="
echo " Portfolio Structure Setup"
echo "=========================================="
echo "Project: $PROJECT_ROOT"
echo

# ==========================================
# Directory Structure
# ==========================================

directories=(

    # Shared infrastructure
    "common/constants"
    "common/enums"
    "common/errors"
    "common/interfaces"
    "common/middlewares"
    "common/types"
    "common/utils"
    "common/validators"

    # Database
    "lib/prisma/queries"

    # Core libraries
    "lib/auth"
    "lib/ai"
    "lib/cache"
    "lib/email"
    "lib/utils"

    # Server-side architecture
    "server/actions"
    "server/services"
    "server/validators"

    # Profile
    "modules/profile"
    "modules/social-links"
    "modules/languages"
    "modules/profile-items"

    # Skills
    "modules/skill-groups"
    "modules/skills"

    # Projects
    "modules/projects"

    # Certifications
    "modules/certifications"

    # Experience
    "modules/experiences"

    # Education
    "modules/educations"

    # Contact
    "modules/contact"

    # Media
    "modules/media"

    # Testimonials
    "modules/testimonials"

    # Blog
    "modules/blog/categories"
    "modules/blog/tags"
    "modules/blog/posts"

    # SEO
    "modules/seo"

    # Newsletter
    "modules/newsletter"

    # Analytics
    "modules/analytics/page-views"
    "modules/analytics/project-views"

    # Audit logs
    "modules/audit-logs"

    # AI features
    "modules/ai/embeddings"
    "modules/ai/search"
    "modules/ai/chat"
    "modules/ai/knowledge"

    # Documentation
    "modules/docs"

    # Administration
    "modules/admin/dashboard"
    "modules/admin/users"

    # Background processing
    "jobs"
    "queues"
    "events"

    # Templates
    "templates/emails"
)

# ==========================================
# Create Directories
# ==========================================

created=0
existing=0

for directory in "${directories[@]}"; do

    if [[ -d "$PROJECT_ROOT/$directory" ]]; then
        ((existing += 1))
        continue
    fi

    mkdir -p "$PROJECT_ROOT/$directory"

    printf '  [created] %s\n' "$directory"

    ((created += 1))

done

# ==========================================
# Summary
# ==========================================

echo
echo "=========================================="
echo " Setup Completed Successfully!"
echo "=========================================="
echo "Project root : $PROJECT_ROOT"
echo "Created      : $created directories"
echo "Existing     : $existing directories"
echo "Total        : ${#directories[@]} directories"
echo "=========================================="
echo

echo "Next: inspect your project structure using:"
echo
echo "  tree -L 3"
echo

