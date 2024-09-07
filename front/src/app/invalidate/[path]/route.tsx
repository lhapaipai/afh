import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

interface Props {
  params: {
    path: string;
  };
}

export function GET(request: NextRequest, { params: { path } }: Props) {
  if (path === "home") {
    revalidatePath("/", "page");
  }

  return Response.json({
    success: true,
    path,
  });
}
