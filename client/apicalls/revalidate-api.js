'use server';
import { revalidateTag } from 'next/cache';
export default async function revalidateApi(type) {
  revalidateTag(type);
}
