import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(3, "Category must be at least 3 characters"),
    link: z.string().url("Please enter a valid URL for the image"),
    pitch: z.string().min(10, "Pitch must be at least 10 characters"),
});
