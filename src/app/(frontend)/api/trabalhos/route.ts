import { NextResponse } from "next/server";
import { getAllTrabalhos } from "@/app/(frontend)/_lib/notion";

export async function GET() {
    const works = await getAllTrabalhos();
    return NextResponse.json({ success: true, works });
}