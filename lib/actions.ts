"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/writeClient";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({ error: "Not signed in", status: "ERROR" });
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    );

    // Validate fields
    if (!title || !description || !category || !link) {
        return parseServerActionResponse({
            error: "All fields are required.",
            status: "ERROR",
        });
    }

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            _type: "startup",
            title,
            description,
            category,
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session.id,
            },
            pitch,
        };

        const result = await writeClient.create(startup);
        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        console.error("Error creating pitch:", error);
        return parseServerActionResponse({
            error: "An unexpected error occurred while creating the pitch.",
            status: "ERROR",
        });
    }
};
