import { redirect } from "next/navigation";

import { docsPages } from "@/components/docs/docs-config";

// /docs has no content of its own: it opens the first page in the sidebar.
export default function DocsIndexPage() {
  redirect(docsPages[0].href);
}
