import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardPropInterface {
  id: number
  cardTitle: string
  firstPart: string
  secondPart: string
}

export default function AboutCard({ content }: { content: CardPropInterface }) {
  return (
    <Card className="glass-morphism rounded-md border transition-all duration-300 hover:-translate-y-1 hover:border-primary">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(40,10,60,1)_0%,rgba(10,5,20,1)_100%)] to-muted" />

      <CardHeader>
        <CardTitle className="text-lg font-semibold md:text-xl">
          {content.cardTitle}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
        <p>{content.firstPart}</p>

        <p>{content.secondPart}</p>
      </CardContent>
    </Card>
  )
}
