import { Link, usePage } from "@inertiajs/react";
import { type ReactNode } from "react";

/**
 * Admin shell: slim sidebar (per PRD §10 nav structure) + content area.
 * Nav only lists sections that have a working route today — Kategori
 * and Settings are in the PRD's nav sketch but have no controller/page
 * yet, so they're left out rather than linking to a 404.
 */

type NavItem = {
    label: string;
    href: string;
    /** Prefix match — highlights active for /admin/berita/5/edit too. */
    match: string;
};

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin", match: "/admin" },
    { label: "Berita", href: "/admin/berita", match: "/admin/berita" },
    { label: "Warga NU", href: "/admin/warga", match: "/admin/warga" },
];

function isActive(current: string, item: NavItem) {
    if (item.match === "/admin") return current === "/admin";
    return current.startsWith(item.match);
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { url, props } = usePage();
    const user = props.auth.user;
    const flashSuccess = props.flash?.success;

    return (
        <div className="flex min-h-screen bg-background">
            <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-surface">
                <div className="px-5 py-5">
                    <p className="text-sm font-semibold text-primary">
                        NU Village
                    </p>
                    <p className="text-xs text-muted-foreground">
                        News Portal — Admin
                    </p>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {navItems.map((item) => {
                        const active = isActive(url, item);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                                    (active
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-ink")
                                }
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border px-3 py-3">
                    <div className="mb-2 px-2">
                        <p className="truncate text-sm font-medium text-ink">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                        Keluar
                    </Link>
                </div>
            </aside>

            <main className="flex-1 px-8 py-8">
                {flashSuccess && (
                    <div className="mb-6 rounded-lg bg-secondary/15 px-4 py-3 text-sm text-primary">
                        {flashSuccess}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
