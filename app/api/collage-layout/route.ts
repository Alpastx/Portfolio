import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const fields = ["x", "y", "width", "rotate", "z"] as const;

export function GET() {
  return new Response(null, { status: 404 });
}

type Entry = { src: string } & Record<(typeof fields)[number], number>;

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  const { items } = (await request.json()) as { items?: Entry[] };
  if (!Array.isArray(items)) {
    return Response.json({ error: "items missing" }, { status: 400 });
  }

  const file = path.join(process.cwd(), "content", "site.ts");
  let source = await readFile(file, "utf8");

  for (const item of items) {
    const start = source.indexOf(`src: ${JSON.stringify(item.src)},`);
    if (start === -1) {
      return Response.json({ error: `${item.src} not found in site.ts` }, { status: 400 });
    }
    const end = source.indexOf("\n    },", start);
    let block = source.slice(start, end);

    for (const field of fields) {
      const value = item[field];
      if (typeof value !== "number" || !Number.isFinite(value)) {
        return Response.json({ error: `${item.src}: bad ${field}` }, { status: 400 });
      }
      const pattern = new RegExp(`(\\n\\s+${field}: )[^,\\n]+,`);
      if (!pattern.test(block)) {
        return Response.json({ error: `${item.src}: no ${field} field` }, { status: 400 });
      }
      block = block.replace(pattern, `$1${value},`);
    }

    source = source.slice(0, start) + block + source.slice(end);
  }

  await writeFile(file, source);
  return Response.json({ ok: true });
}
