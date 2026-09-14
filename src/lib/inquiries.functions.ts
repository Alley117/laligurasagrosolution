import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  const password = process.env.ADMIN_SESSION_SECRET;
  if (!password) throw new Error("ADMIN_SESSION_SECRET is not set");
  return {
    password,
    name: "laligurans-admin",
    maxAge: 60 * 60 * 8,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

async function requireUnlocked() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw new Error("Not authorized");
}

export type InquiryInput = {
  name: string;
  email: string;
  phone?: string;
  guests?: string;
  checkin?: string;
  checkout?: string;
  cottage?: string;
  message?: string;
};

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: InquiryInput) => {
    const name = (data?.name ?? "").trim().slice(0, 120);
    const email = (data?.email ?? "").trim().slice(0, 200);
    if (!name || !email.includes("@")) throw new Error("Please enter your name and a valid email.");
    return {
      name,
      email,
      phone: (data.phone ?? "").trim().slice(0, 60),
      guests: (data.guests ?? "").trim().slice(0, 20),
      checkin: (data.checkin ?? "").trim().slice(0, 40),
      checkout: (data.checkout ?? "").trim().slice(0, 40),
      cottage: (data.cottage ?? "").trim().slice(0, 120),
      message: (data.message ?? "").trim().slice(0, 4000),
    };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("booking_inquiries").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const listInquiries = createServerFn({ method: "GET" }).handler(async () => {
  await requireUnlocked();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("booking_inquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const markInquiryRead = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; isRead: boolean }) => data)
  .handler(async ({ data }) => {
    await requireUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("booking_inquiries")
      .update({ is_read: data.isRead })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await requireUnlocked();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("booking_inquiries")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
