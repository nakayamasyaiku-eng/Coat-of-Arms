type Props = {kicker: string; title: string; intro?: string; align?: 'left' | 'center'};

export function SectionHeading({kicker, title, intro, align = 'left'}: Props) {
  return <div className={`section-heading ${align}`}><p className="kicker">{kicker}</p><h2>{title}</h2>{intro && <p className="section-intro">{intro}</p>}</div>;
}
