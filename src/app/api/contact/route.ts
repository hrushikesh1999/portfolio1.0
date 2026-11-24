// Match the syntax of the form's native email input for direct API requests.
const emailPattern = /^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;
const providerTimeoutMs = 10_000;

export async function POST(request: Request) {
    const fields = await request.formData().catch(() => null);
    const name = fields?.get("name");
    const email = fields?.get("email");
    const message = fields?.get("message");

    if (typeof name !== "string" || !name.trim() ||
        typeof email !== "string" || !emailPattern.test(email) ||
        typeof message !== "string" || !message.trim()) {
        return Response.json({ ok: false }, { status: 400 });
    }

    const endpoint = process.env.POST_EMAIL;
    if (!endpoint) {
        return Response.json({ ok: false }, { status: 503 });
    }

    const signal = AbortSignal.timeout(providerTimeoutMs);
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new URLSearchParams({ name, email, message }),
            redirect: "error",
            signal,
        });

        if (!response.ok) {
            return Response.json({ ok: false }, { status: 502 });
        }

        await response.json();
        return Response.json({ ok: true });
    } catch {
        return Response.json({ ok: false }, { status: signal.aborted ? 504 : 502 });
    }
}
