import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label } from "@/components/ui/Input";
import { Head, useForm } from "@inertiajs/react";
import { type FormEventHandler } from "react";

/**
 * Admin login page. Rendered by Fortify::loginView() in
 * FortifyServiceProvider — Fortify handles the actual POST /login
 * submission and session/redirect logic, this page only needs to
 * submit to that same route.
 */
export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Masuk Admin" />
            <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
                <div className="w-full max-w-sm">
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold text-primary">
                            NU Village News Portal
                        </p>
                        <h1 className="mt-2 text-xl font-semibold text-ink">
                            Masuk ke panel admin
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Khusus pengurus yang mengelola berita dan data
                            warga.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
                        {status && (
                            <p className="mb-4 rounded-lg bg-secondary/15 px-3 py-2 text-sm text-primary">
                                {status}
                            </p>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    autoFocus
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <FieldError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="password">Kata sandi</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <FieldError message={errors.password} />
                            </div>

                            <label className="flex items-center gap-2 text-sm text-muted-foreground">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary/30"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                Ingat saya
                            </label>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                {processing ? "Memproses..." : "Masuk"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
