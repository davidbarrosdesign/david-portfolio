import { NextResponse } from "next/server";
import { getAllDepoimentos } from "@/app/(frontend)/_lib/notion";

export async function GET() {
    const testimonials = await getAllDepoimentos();
    return NextResponse.json({ success: true, testimonials });
}