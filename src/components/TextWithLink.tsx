/**
 * Renders a plain string with one phrase inside it turned into a link.
 *
 * Content in `content.ts` is plain data (no markup), but a couple of entries
 * need a link partway through a sentence — e.g. a Recent Updates line linking a
 * paper title to the Publications section. Keeping the substring in the data and
 * doing the splitting here avoids putting JSX into the content file.
 *
 * Falls back to rendering the text unchanged if the phrase isn't found.
 */
export default function TextWithLink({
  text,
  link,
}: {
  text: string;
  link?: { text: string; href: string };
}) {
  if (!link || !text.includes(link.text)) return <>{text}</>;

  const index = text.indexOf(link.text);
  const before = text.slice(0, index);
  const after = text.slice(index + link.text.length);

  return (
    <>
      {before}
      <a href={link.href} className="link">
        {link.text}
      </a>
      {after}
    </>
  );
}
