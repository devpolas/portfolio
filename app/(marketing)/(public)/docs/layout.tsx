import type { ReactNode } from "react";

import { docsNav } from "@/components/docs/docs-config";
import { DocsMobileNav, DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsToc } from "@/components/docs/docs-toc";

// `top-24` keeps the side columns below the site header. Change it to match
// your navbar height.
export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className='lg:gap-10 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)_13rem] mx-auto px-4 w-11/12 lg:w-10/12'>
      <aside className='hidden lg:block'>
        <div className='top-24 sticky py-12 max-h-[calc(100vh-8rem)] overflow-y-auto'>
          <DocsSidebar nav={docsNav} />
        </div>
      </aside>

      <div className='py-12 min-w-0'>
        <DocsMobileNav nav={docsNav} />

        <article id='docs-content' className='max-w-3xl'>
          {children}
        </article>
      </div>

      <aside className='hidden xl:block'>
        <div className='top-24 sticky py-12 max-h-[calc(100vh-8rem)] overflow-y-auto'>
          <DocsToc />
        </div>
      </aside>
    </div>
  );
}
