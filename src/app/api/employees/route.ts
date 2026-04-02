import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/services/supabase";

export async function GET() {
  try {
    const client = getSupabaseClient();
    if (!client) {
      return NextResponse.json([]);
    }
    const { data } = await client
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });
    return NextResponse.json(data ?? []);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to fetch employees";
    return NextResponse.json({ detail: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = getSupabaseClient();
    if (!client) {
      // Return mock response with generated ID if no Supabase
      const body = await request.json();
      return NextResponse.json({ id: crypto.randomUUID(), ...body, created_at: new Date().toISOString() });
    }

    const body = await request.json();
    const { data, error } = await client
      .from("employees")
      .insert(body)
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to save employee";
    return NextResponse.json({ detail: msg }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const client = getSupabaseClient();
    if (!client) {
      const body = await request.json();
      return NextResponse.json({ ...body, updated_at: new Date().toISOString() });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ detail: "Employee ID is required" }, { status: 400 });
    }

    const { data, error } = await client
      .from("employees")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update employee";
    return NextResponse.json({ detail: msg }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const client = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ detail: "Employee ID is required" }, { status: 400 });
    }

    if (!client) {
      return NextResponse.json({ success: true });
    }

    const { error } = await client.from("employees").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to delete employee";
    return NextResponse.json({ detail: msg }, { status: 400 });
  }
}
