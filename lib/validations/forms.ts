import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const signUpSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  businessName: z.string().min(2),
  whatsappNumber: z.string().min(8)
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export const businessProfileSchema = z.object({
  businessId: z.string().min(1),
  nameEn: z.string().min(2),
  nameAr: z.string().min(2),
  descriptionEn: z.string().min(2),
  descriptionAr: z.string().min(2),
  addressEn: z.string().min(2),
  addressAr: z.string().min(2),
  whatsappNumber: z.string().min(8),
  instagramHandle: z.string().min(1),
  currency: z.string().default("OMR"),
  logoUrl: z.string().url(),
  bannerUrl: z.string().url()
});

export const productSchema = z.object({
  id: z.string().optional(),
  businessId: z.string().min(1),
  categoryId: z.string().optional(),
  nameEn: z.string().min(2),
  nameAr: z.string().min(2),
  descriptionEn: z.string().min(2),
  descriptionAr: z.string().min(2),
  price: z.coerce.number().min(0),
  imageUrl: z.string().url(),
  status: z.enum(["draft", "active", "archived"]),
  available: z.coerce.boolean().default(true),
  featured: z.coerce.boolean().default(false)
});

export const whatsappCheckoutSchema = z.object({
  locale: z.enum(["en", "ar"]),
  whatsappNumber: z.string().min(8),
  currency: z.string().default("OMR"),
  customerName: z.string().optional(),
  customerLocation: z.string().optional(),
  notes: z.string().optional(),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        quantity: z.number().int().positive(),
        lineTotal: z.number().nonnegative()
      })
    )
    .min(1),
  total: z.number().nonnegative()
});
